import type Konva from 'konva';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import './App.css';
import ArrowShape from './components/ArrowShape';
import BallToken from './components/BallToken';
import Pitch from './components/Pitch';
import PlayerEditor from './components/PlayerEditor';
import PenStroke from './components/PenStroke';
import PlayerToken from './components/PlayerToken';
import Toolbar from './components/Toolbar';
import ZoneShape from './components/ZoneShape';
import { buildFormation, buildRealTeamFormation } from './formations';
import { deleteScheme, loadSchemes, saveScheme } from './schemes';
import { SERIE_A_TEAMS } from './serieATeams';
import { DEFAULT_TEAM_COLORS, tokenColorsFromTeamKit } from './teamColors';
import type {
  ArrowData,
  ArrowStyle,
  BoardState,
  Formation,
  PenStrokeData,
  SequenceStep,
  Team,
  ToolMode,
  ZoneData,
  ZoneKind,
} from './types';
import { draftToEllipse, draftToRect, easeInOutQuad, lerp, makeId, type ShapeDraft } from './utils';

const DEFAULT_HIGHLIGHT_COLOR = '#ffd43b';
const DEFAULT_PEN_COLOR = '#ffffff';

const PITCH_WIDTH = 900;
const PITCH_HEIGHT = 580;
const PLAYER_RADIUS = 16;
const BALL_RADIUS = 8;
const ANIMATION_DURATION_MS = 900;
const ARROW_FADE_DURATION_MS = 600;
const HISTORY_LIMIT = 50;
const MAX_SEQUENCE_STEPS = 5;
const MAX_PITCH_SCALE = 1.5;
const RECORDING_FPS = 30;
const VIDEO_MIME_CANDIDATES = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'];

function nextAnimationFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

// Saves a generated file for the viewer. When running inside a host that exposes the
// Claude Artifact "downloads" capability (e.g. this app's own preview), it hands the file
// off through that capability's confirmation flow; everywhere else (the real deployed app)
// it falls back to a standard blob download link.
async function saveGeneratedFile(filename: string, blob: Blob): Promise<void> {
  const claudeGlobal = (window as unknown as { claude?: { use?: (name: string) => Promise<unknown> } }).claude;
  if (claudeGlobal?.use) {
    try {
      const downloads = (await claudeGlobal.use('downloads')) as
        | { save: (req: { filename: string; data: Blob }) => Promise<unknown> }
        | null;
      if (downloads) {
        await downloads.save({ filename, data: blob });
        return;
      }
    } catch (err) {
      const code = (err as { code?: string } | undefined)?.code;
      if (code === 'declined') return;
      console.warn('Download capability failed, falling back to a direct download link.', err);
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function initialState(formationA: Formation, formationB: Formation): BoardState {
  return {
    players: [
      ...buildFormation('A', formationA, PITCH_WIDTH, PITCH_HEIGHT),
      ...buildFormation('B', formationB, PITCH_WIDTH, PITCH_HEIGHT),
    ],
    ball: { id: 'ball', x: PITCH_WIDTH / 2, y: PITCH_HEIGHT / 2 },
    arrows: [],
    zones: [],
    penStrokes: [],
  };
}

const MIN_SHAPE_SIZE = 8;

function buildZone(kind: ZoneKind, draft: ShapeDraft, color: string): ZoneData | null {
  if (kind === 'rect') {
    const rect = draftToRect(draft);
    if (rect.width < MIN_SHAPE_SIZE || rect.height < MIN_SHAPE_SIZE) return null;
    return { id: makeId('zone'), kind: 'rect', color, ...rect };
  }
  if (kind === 'ellipse') {
    const ellipse = draftToEllipse(draft);
    if (ellipse.radiusX < MIN_SHAPE_SIZE || ellipse.radiusY < MIN_SHAPE_SIZE) return null;
    return { id: makeId('zone'), kind: 'ellipse', color, ...ellipse };
  }
  return null;
}

interface HistoryEntry {
  board: BoardState;
  sequenceSteps: SequenceStep[];
  sequenceStartSnapshot: BoardState | null;
}

interface DrawingArrow {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  targetId?: string;
}

export default function App() {
  const [formationA, setFormationA] = useState<Formation>('4-4-2');
  const [formationB, setFormationB] = useState<Formation>('4-3-3');
  const [board, setBoard] = useState<BoardState>(() => initialState('4-4-2', '4-3-3'));
  const [mode, setMode] = useState<ToolMode>('select');
  const [isPlaying, setIsPlaying] = useState(false);
  const [drawingArrow, setDrawingArrow] = useState<DrawingArrow | null>(null);
  const [freeDrawPoints, setFreeDrawPoints] = useState<number[] | null>(null);
  const [shapeDraft, setShapeDraft] = useState<ShapeDraft | null>(null);
  const [highlightColor, setHighlightColor] = useState(DEFAULT_HIGHLIGHT_COLOR);
  const [zoneShape, setZoneShape] = useState<ZoneKind>('freehand');
  const [penColor, setPenColor] = useState(DEFAULT_PEN_COLOR);
  const [penPoints, setPenPoints] = useState<number[] | null>(null);
  const [schemeNames, setSchemeNames] = useState<string[]>([]);
  const [containerWidth, setContainerWidth] = useState(PITCH_WIDTH);
  const [realTeamAId, setRealTeamAId] = useState<string | null>(null);
  const [realTeamBId, setRealTeamBId] = useState<string | null>(null);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [sequenceSteps, setSequenceSteps] = useState<SequenceStep[]>([]);
  const [sequenceStartSnapshot, setSequenceStartSnapshot] = useState<BoardState | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const historyRef = useRef<HistoryEntry[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const boardRef = useRef(board);
  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    setSchemeNames(loadSchemes().map((s) => s.name));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = Math.min(MAX_PITCH_SCALE, containerWidth / PITCH_WIDTH);

  useEffect(() => {
    if (mode !== 'select') setEditingPlayerId(null);
  }, [mode]);

  const colorsA = useMemo(() => {
    const team = SERIE_A_TEAMS.find((t) => t.id === realTeamAId);
    return team ? tokenColorsFromTeamKit(team.colorePrimario, team.coloreSecondario) : DEFAULT_TEAM_COLORS.A;
  }, [realTeamAId]);

  const colorsB = useMemo(() => {
    const team = SERIE_A_TEAMS.find((t) => t.id === realTeamBId);
    return team ? tokenColorsFromTeamKit(team.colorePrimario, team.coloreSecondario) : DEFAULT_TEAM_COLORS.B;
  }, [realTeamBId]);

  const pushHistory = useCallback(() => {
    historyRef.current.push({ board, sequenceSteps, sequenceStartSnapshot });
    if (historyRef.current.length > HISTORY_LIMIT) historyRef.current.shift();
    setCanUndo(true);
  }, [board, sequenceSteps, sequenceStartSnapshot]);

  const handleUndo = useCallback(() => {
    const previous = historyRef.current.pop();
    if (!previous) return;
    setBoard(previous.board);
    setSequenceSteps(previous.sequenceSteps);
    setSequenceStartSnapshot(previous.sequenceStartSnapshot);
    setCanUndo(historyRef.current.length > 0);
  }, []);

  const handleApplyFormations = useCallback(() => {
    pushHistory();
    setEditingPlayerId(null);
    setSequenceSteps([]);
    setSequenceStartSnapshot(null);
    const teamA = SERIE_A_TEAMS.find((t) => t.id === realTeamAId);
    const teamB = SERIE_A_TEAMS.find((t) => t.id === realTeamBId);
    setBoard({
      players: [
        teamA
          ? buildRealTeamFormation('A', teamA, formationA, PITCH_WIDTH, PITCH_HEIGHT)
          : buildFormation('A', formationA, PITCH_WIDTH, PITCH_HEIGHT),
        teamB
          ? buildRealTeamFormation('B', teamB, formationB, PITCH_WIDTH, PITCH_HEIGHT)
          : buildFormation('B', formationB, PITCH_WIDTH, PITCH_HEIGHT),
      ].flat(),
      ball: { id: 'ball', x: PITCH_WIDTH / 2, y: PITCH_HEIGHT / 2 },
      arrows: [],
      zones: [],
      penStrokes: [],
    });
  }, [formationA, formationB, realTeamAId, realTeamBId, pushHistory]);

  const handleApplyRealTeam = useCallback(
    (slot: Team, teamId: string) => {
      pushHistory();
      setEditingPlayerId(null);
      setSequenceSteps([]);
      setSequenceStartSnapshot(null);
      const realTeam = SERIE_A_TEAMS.find((t) => t.id === teamId);
      const formation = realTeam?.moduloBase ?? (slot === 'A' ? formationA : formationB);
      const newPlayers = realTeam
        ? buildRealTeamFormation(slot, realTeam, formation, PITCH_WIDTH, PITCH_HEIGHT)
        : buildFormation(slot, formation, PITCH_WIDTH, PITCH_HEIGHT);

      if (slot === 'A') {
        setFormationA(formation);
        setRealTeamAId(realTeam ? teamId : null);
      } else {
        setFormationB(formation);
        setRealTeamBId(realTeam ? teamId : null);
      }

      setBoard((b) => ({
        ...b,
        players: [...b.players.filter((p) => p.team !== slot), ...newPlayers],
        ball: { id: 'ball', x: PITCH_WIDTH / 2, y: PITCH_HEIGHT / 2 },
        arrows: [],
        zones: [],
        penStrokes: [],
      }));
    },
    [formationA, formationB, pushHistory],
  );

  const handleClearArrows = useCallback(() => {
    pushHistory();
    setBoard((b) => ({ ...b, arrows: [] }));
  }, [pushHistory]);

  const handleClearZones = useCallback(() => {
    pushHistory();
    setBoard((b) => ({ ...b, zones: [] }));
  }, [pushHistory]);

  const handleClearPen = useCallback(() => {
    pushHistory();
    setBoard((b) => ({ ...b, penStrokes: [] }));
  }, [pushHistory]);

  const findTokenIdAt = (target: Konva.Node): string | undefined => {
    const group = target.findAncestor('.token', true) as Konva.Group | undefined;
    return group?.id();
  };

  const getPointer = (stage: Konva.Stage): { x: number; y: number } | null => {
    const pos = stage.getPointerPosition();
    if (!pos) return null;
    return { x: pos.x / scale, y: pos.y / scale };
  };

  const handlePointerDown = (e: Konva.KonvaEventObject<PointerEvent>) => {
    if (mode === 'select' || mode === 'erase' || isPlaying) return;
    const stage = e.target.getStage();
    if (!stage) return;
    const pointer = getPointer(stage);
    if (!pointer) return;

    if (mode === 'draw') {
      if (zoneShape === 'freehand') {
        setFreeDrawPoints([pointer.x, pointer.y]);
      } else {
        setShapeDraft({ startX: pointer.x, startY: pointer.y, endX: pointer.x, endY: pointer.y });
      }
      return;
    }

    if (mode === 'pen') {
      setPenPoints([pointer.x, pointer.y]);
      return;
    }

    const tokenId = findTokenIdAt(e.target);
    let startX = pointer.x;
    let startY = pointer.y;
    if (tokenId) {
      const token = [...board.players, board.ball].find((o) => o.id === tokenId);
      if (token) {
        startX = token.x;
        startY = token.y;
      }
    }
    setDrawingArrow({ startX, startY, endX: pointer.x, endY: pointer.y, targetId: tokenId });
  };

  const handlePointerMove = (e: Konva.KonvaEventObject<PointerEvent>) => {
    if (!drawingArrow && !freeDrawPoints && !shapeDraft && !penPoints) return;
    const stage = e.target.getStage();
    if (!stage) return;
    const pointer = getPointer(stage);
    if (!pointer) return;

    if (freeDrawPoints) {
      const lastX = freeDrawPoints[freeDrawPoints.length - 2];
      const lastY = freeDrawPoints[freeDrawPoints.length - 1];
      if (Math.hypot(pointer.x - lastX, pointer.y - lastY) >= 3) {
        setFreeDrawPoints([...freeDrawPoints, pointer.x, pointer.y]);
      }
      return;
    }

    if (penPoints) {
      const lastX = penPoints[penPoints.length - 2];
      const lastY = penPoints[penPoints.length - 1];
      if (Math.hypot(pointer.x - lastX, pointer.y - lastY) >= 2) {
        setPenPoints([...penPoints, pointer.x, pointer.y]);
      }
      return;
    }

    if (shapeDraft) {
      setShapeDraft((d) => (d ? { ...d, endX: pointer.x, endY: pointer.y } : d));
      return;
    }

    setDrawingArrow((d) => (d ? { ...d, endX: pointer.x, endY: pointer.y } : d));
  };

  const handlePointerUp = () => {
    if (penPoints) {
      const points = penPoints;
      setPenPoints(null);
      if (points.length < 4) return;
      pushHistory();
      const stroke: PenStrokeData = { id: makeId('pen'), points, color: penColor };
      setBoard((b) => ({ ...b, penStrokes: [...b.penStrokes, stroke] }));
      return;
    }

    if (freeDrawPoints) {
      const points = freeDrawPoints;
      setFreeDrawPoints(null);
      if (points.length < 4) return;
      pushHistory();
      const zone: ZoneData = { id: makeId('zone'), kind: 'freehand', points, color: highlightColor };
      setBoard((b) => ({ ...b, zones: [...b.zones, zone] }));
      return;
    }

    if (shapeDraft) {
      const draft = shapeDraft;
      setShapeDraft(null);
      const zone = buildZone(zoneShape, draft, highlightColor);
      if (!zone) return;
      pushHistory();
      setBoard((b) => ({ ...b, zones: [...b.zones, zone] }));
      return;
    }

    if (!drawingArrow) return;
    const { startX, startY, endX, endY, targetId } = drawingArrow;
    setDrawingArrow(null);
    const distance = Math.hypot(endX - startX, endY - startY);
    if (distance < 8) return;
    if (mode !== 'run' && mode !== 'pass' && mode !== 'dribble') return;

    pushHistory();
    const arrow: ArrowData = {
      id: makeId('arrow'),
      points: [startX, startY, endX, endY],
      style: mode,
      targetId,
    };
    setBoard((b) => ({ ...b, arrows: [...b.arrows, arrow] }));
  };

  const handleErase = useCallback(
    (id: string) => {
      pushHistory();
      setBoard((b) => ({
        ...b,
        arrows: b.arrows.filter((a) => a.id !== id),
        zones: b.zones.filter((z) => z.id !== id),
        penStrokes: b.penStrokes.filter((s) => s.id !== id),
      }));
    },
    [pushHistory],
  );

  const handleTokenDragStart = useCallback(() => {
    pushHistory();
  }, [pushHistory]);

  const handlePlayerDragMove = useCallback((id: string, x: number, y: number) => {
    setBoard((b) => ({ ...b, players: b.players.map((p) => (p.id === id ? { ...p, x, y } : p)) }));
  }, []);

  const handleBallDragMove = useCallback((id: string, x: number, y: number) => {
    setBoard((b) => ({ ...b, ball: b.ball.id === id ? { ...b.ball, x, y } : b.ball }));
  }, []);

  const rafRef = useRef<number | null>(null);

  // Animates every arrow with a target from the CURRENT board (read via boardRef, so this
  // stays correct even when called repeatedly across an awaited multi-step sequence), fading
  // the used arrows out at the end. `onFrame` lets a caller grab a snapshot for video recording.
  const animateArrows = useCallback((arrows: ArrowData[], onFrame?: () => void): Promise<void> => {
    return new Promise((resolve) => {
      const moves = new Map<string, ArrowData>();
      for (const arrow of arrows) {
        if (arrow.targetId) moves.set(arrow.targetId, arrow);
      }
      if (moves.size === 0) {
        resolve();
        return;
      }

      const current = boardRef.current;
      const startPositions = new Map<string, { x: number; y: number }>();
      for (const p of current.players) startPositions.set(p.id, { x: p.x, y: p.y });
      startPositions.set(current.ball.id, { x: current.ball.x, y: current.ball.y });

      const startTime = performance.now();
      const totalDuration = ANIMATION_DURATION_MS + ARROW_FADE_DURATION_MS;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const moveT = Math.min(1, elapsed / ANIMATION_DURATION_MS);
        const eased = easeInOutQuad(moveT);
        const fadeT = Math.min(1, Math.max(0, elapsed - ANIMATION_DURATION_MS) / ARROW_FADE_DURATION_MS);
        const arrowOpacity = 1 - fadeT;

        setBoard((b) => ({
          ...b,
          players: b.players.map((p) => {
            const arrow = moves.get(p.id);
            const start = startPositions.get(p.id);
            if (!arrow || !start) return p;
            return { ...p, x: lerp(start.x, arrow.points[2], eased), y: lerp(start.y, arrow.points[3], eased) };
          }),
          ball: (() => {
            const arrow = moves.get(b.ball.id);
            const start = startPositions.get(b.ball.id);
            if (!arrow || !start) return b.ball;
            return { ...b.ball, x: lerp(start.x, arrow.points[2], eased), y: lerp(start.y, arrow.points[3], eased) };
          })(),
          arrows: b.arrows.map((a) => (a.targetId ? { ...a, opacity: arrowOpacity } : a)),
        }));
        onFrame?.();

        if (elapsed < totalDuration) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setBoard((b) => ({ ...b, arrows: b.arrows.filter((a) => !a.targetId) }));
          onFrame?.();
          resolve();
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    });
  }, []);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePlay = useCallback(() => {
    if (!board.arrows.some((a) => a.targetId)) return;
    pushHistory();
    setIsPlaying(true);
    animateArrows(board.arrows).then(() => setIsPlaying(false));
  }, [board.arrows, pushHistory, animateArrows]);

  const handleAddSequenceStep = useCallback(() => {
    if (sequenceSteps.length >= MAX_SEQUENCE_STEPS) return;
    if (!board.arrows.some((a) => a.targetId)) return;

    pushHistory();
    if (!sequenceStartSnapshot) setSequenceStartSnapshot(board);
    setSequenceSteps((steps) => [
      ...steps,
      { id: makeId('step'), arrows: board.arrows, zones: board.zones, penStrokes: board.penStrokes },
    ]);

    const moves = new Map<string, ArrowData>();
    for (const arrow of board.arrows) {
      if (arrow.targetId) moves.set(arrow.targetId, arrow);
    }
    setBoard((b) => ({
      ...b,
      players: b.players.map((p) => {
        const arrow = moves.get(p.id);
        return arrow ? { ...p, x: arrow.points[2], y: arrow.points[3] } : p;
      }),
      ball: (() => {
        const arrow = moves.get(b.ball.id);
        return arrow ? { ...b.ball, x: arrow.points[2], y: arrow.points[3] } : b.ball;
      })(),
      arrows: [],
    }));
  }, [board, sequenceSteps.length, sequenceStartSnapshot, pushHistory]);

  const handleRemoveLastStep = useCallback(() => {
    setSequenceSteps((steps) => steps.slice(0, -1));
  }, []);

  const handleClearSequence = useCallback(() => {
    setSequenceSteps([]);
    setSequenceStartSnapshot(null);
  }, []);

  const handlePlaySequence = useCallback(async () => {
    if (sequenceSteps.length === 0 || !sequenceStartSnapshot) return;
    pushHistory();
    setIsPlaying(true);
    setBoard({ ...sequenceStartSnapshot, arrows: [] });
    await nextAnimationFrame();
    await nextAnimationFrame();
    for (const step of sequenceSteps) {
      setBoard((b) => ({ ...b, arrows: step.arrows, zones: step.zones, penStrokes: step.penStrokes }));
      await nextAnimationFrame();
      await nextAnimationFrame();
      await animateArrows(step.arrows);
    }
    setIsPlaying(false);
  }, [sequenceSteps, sequenceStartSnapshot, pushHistory, animateArrows]);

  const handleDownloadVideo = useCallback(async () => {
    const stage = stageRef.current;
    if (sequenceSteps.length === 0 || !sequenceStartSnapshot || !stage) return;
    if (typeof MediaRecorder === 'undefined') {
      window.alert('Il download video non è supportato in questo browser.');
      return;
    }
    const mimeType = VIDEO_MIME_CANDIDATES.find((m) => MediaRecorder.isTypeSupported(m));
    if (!mimeType) {
      window.alert('Il download video non è supportato in questo browser.');
      return;
    }

    const recordCanvas = document.createElement('canvas');
    recordCanvas.width = stage.width();
    recordCanvas.height = stage.height();
    const ctx = recordCanvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = () => {
      const merged = stage.toCanvas();
      ctx.clearRect(0, 0, recordCanvas.width, recordCanvas.height);
      ctx.drawImage(merged, 0, 0);
    };

    const stream = recordCanvas.captureStream(RECORDING_FPS);
    const recorder = new MediaRecorder(stream, { mimeType });
    const chunks: BlobPart[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    const stopped = new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });

    pushHistory();
    setIsRecording(true);
    setIsPlaying(true);
    setBoard({ ...sequenceStartSnapshot, arrows: [] });
    drawFrame();
    recorder.start();
    await nextAnimationFrame();
    await nextAnimationFrame();
    drawFrame();

    for (const step of sequenceSteps) {
      setBoard((b) => ({ ...b, arrows: step.arrows, zones: step.zones, penStrokes: step.penStrokes }));
      await nextAnimationFrame();
      await nextAnimationFrame();
      drawFrame();
      await animateArrows(step.arrows, drawFrame);
    }

    recorder.stop();
    await stopped;

    const blob = new Blob(chunks, { type: mimeType });
    const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
    await saveGeneratedFile(`lavagna-tattica-sequenza.${extension}`, blob);

    setIsPlaying(false);
    setIsRecording(false);
  }, [sequenceSteps, sequenceStartSnapshot, pushHistory, animateArrows]);

  const handleSaveScheme = useCallback(
    (name: string) => {
      const updated = saveScheme(name, board);
      setSchemeNames(updated.map((s) => s.name));
    },
    [board],
  );

  const handleLoadScheme = useCallback((name: string) => {
    const scheme = loadSchemes().find((s) => s.name === name);
    if (!scheme) return;
    pushHistory();
    setEditingPlayerId(null);
    setSequenceSteps([]);
    setSequenceStartSnapshot(null);
    setBoard({ ...scheme.state, zones: scheme.state.zones ?? [], penStrokes: scheme.state.penStrokes ?? [] });
  }, [pushHistory]);

  const handleSelectPlayer = useCallback((id: string) => {
    setEditingPlayerId(id);
  }, []);

  const handleCloseEditor = useCallback(() => {
    setEditingPlayerId(null);
  }, []);

  const handleSavePlayer = useCallback(
    (name: string, number: number) => {
      if (!editingPlayerId) return;
      pushHistory();
      const trimmed = name.trim();
      setBoard((b) => ({
        ...b,
        players: b.players.map((p) =>
          p.id === editingPlayerId ? { ...p, name: trimmed || undefined, number } : p,
        ),
      }));
      setEditingPlayerId(null);
    },
    [editingPlayerId, pushHistory],
  );

  const handleDeleteScheme = useCallback((name: string) => {
    const updated = deleteScheme(name);
    setSchemeNames(updated.map((s) => s.name));
  }, []);

  const previewArrow: ArrowData | null = useMemo(() => {
    if (!drawingArrow) return null;
    const style: ArrowStyle = mode === 'run' || mode === 'pass' || mode === 'dribble' ? mode : 'run';
    return {
      id: 'preview',
      points: [drawingArrow.startX, drawingArrow.startY, drawingArrow.endX, drawingArrow.endY],
      style,
    };
  }, [drawingArrow, mode]);

  const previewZone: ZoneData | null = useMemo(() => {
    if (freeDrawPoints) {
      return { id: 'preview-zone', kind: 'freehand', points: freeDrawPoints, color: highlightColor };
    }
    if (shapeDraft) {
      if (zoneShape === 'rect') {
        return { id: 'preview-zone', kind: 'rect', color: highlightColor, ...draftToRect(shapeDraft) };
      }
      if (zoneShape === 'ellipse') {
        return { id: 'preview-zone', kind: 'ellipse', color: highlightColor, ...draftToEllipse(shapeDraft) };
      }
    }
    return null;
  }, [freeDrawPoints, shapeDraft, zoneShape, highlightColor]);

  const previewPen: PenStrokeData | null = useMemo(() => {
    if (!penPoints) return null;
    return { id: 'preview-pen', points: penPoints, color: penColor };
  }, [penPoints, penColor]);

  const editingPlayer = board.players.find((p) => p.id === editingPlayerId) ?? null;

  return (
    <div className="app">
      <h1>Lavagna Tattica Calcio</h1>
      <div className="app-layout">
        <div className="main-column">
          {isRecording && <p className="recording-indicator">🔴 Registrazione video in corso…</p>}
          <div className="pitch-container" ref={containerRef}>
            <Stage
              ref={stageRef}
              width={PITCH_WIDTH * scale}
              height={PITCH_HEIGHT * scale}
              scaleX={scale}
              scaleY={scale}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <Layer>
                <Pitch width={PITCH_WIDTH} height={PITCH_HEIGHT} />
              </Layer>
              <Layer>
                {board.zones.map((zone) => (
                  <ZoneShape key={zone.id} data={zone} erasable={mode === 'erase'} onClick={handleErase} />
                ))}
                {previewZone && <ZoneShape data={previewZone} erasable={false} />}
              </Layer>
              <Layer>
                {board.arrows.map((arrow) => (
                  <ArrowShape key={arrow.id} data={arrow} erasable={mode === 'erase'} onClick={handleErase} />
                ))}
                {previewArrow && <ArrowShape data={previewArrow} erasable={false} />}
              </Layer>
              <Layer>
                {board.players.map((p) => (
                  <PlayerToken
                    key={p.id}
                    data={p}
                    radius={PLAYER_RADIUS}
                    colors={p.team === 'A' ? colorsA : colorsB}
                    draggable={mode === 'select' && !isPlaying}
                    selected={p.id === editingPlayerId}
                    onSelect={mode === 'select' && !isPlaying ? handleSelectPlayer : undefined}
                    onDragStart={handleTokenDragStart}
                    onDragMove={handlePlayerDragMove}
                    onDragEnd={() => {}}
                  />
                ))}
                <BallToken
                  data={board.ball}
                  radius={BALL_RADIUS}
                  draggable={mode === 'select' && !isPlaying}
                  onDragStart={handleTokenDragStart}
                  onDragMove={handleBallDragMove}
                  onDragEnd={() => {}}
                />
              </Layer>
              <Layer>
                {board.penStrokes.map((stroke) => (
                  <PenStroke key={stroke.id} data={stroke} erasable={mode === 'erase'} onClick={handleErase} />
                ))}
                {previewPen && <PenStroke data={previewPen} erasable={false} />}
              </Layer>
            </Stage>
          </div>
          <p className="hint">
            Modalità "Muovi": trascina giocatori e palla. Modalità corsa/passaggio/dribbling: disegna una freccia da
            un giocatore (o dalla palla) verso la posizione di destinazione, poi premi Play per animare i movimenti:
            a fine animazione la freccia usata si dissolve.
            Modalità "Zone": scegli una forma (libero, rettangolo o cerchio) e un colore, poi disegna sul campo per
            evidenziare gli spazi. Nella sezione "Squadre Serie A" puoi caricare la rosa e i colori reali di una
            squadra per lato. In modalità "Muovi" clicca su un giocatore per modificarne nome e numero. Nella
            sezione "Sequenza video" puoi disegnare fino a 5 fasi di movimento in successione, poi riprodurle tutte
            di seguito o scaricarle come video. Modalità "Penna": scrivi o disegna a mano libera con un tratto
            sottile, come con un pennarello.
          </p>
        </div>
        <aside className="sidebar">
          {editingPlayer && (
            <PlayerEditor player={editingPlayer} onSave={handleSavePlayer} onClose={handleCloseEditor} />
          )}
          <Toolbar
            mode={mode}
            setMode={setMode}
            highlightColor={highlightColor}
            setHighlightColor={setHighlightColor}
            zoneShape={zoneShape}
            setZoneShape={setZoneShape}
            penColor={penColor}
            setPenColor={setPenColor}
            formationA={formationA}
            formationB={formationB}
            setFormationA={setFormationA}
            setFormationB={setFormationB}
            onApplyFormations={handleApplyFormations}
            realTeams={SERIE_A_TEAMS}
            realTeamAId={realTeamAId}
            realTeamBId={realTeamBId}
            onApplyRealTeam={handleApplyRealTeam}
            onPlay={handlePlay}
            isPlaying={isPlaying}
            onUndo={handleUndo}
            canUndo={canUndo}
            onClearArrows={handleClearArrows}
            onClearZones={handleClearZones}
            onClearPen={handleClearPen}
            sequenceStepsCount={sequenceSteps.length}
            maxSequenceSteps={MAX_SEQUENCE_STEPS}
            canAddSequenceStep={sequenceSteps.length < MAX_SEQUENCE_STEPS && board.arrows.some((a) => a.targetId)}
            onAddSequenceStep={handleAddSequenceStep}
            onRemoveLastStep={handleRemoveLastStep}
            onClearSequence={handleClearSequence}
            onPlaySequence={handlePlaySequence}
            onDownloadVideo={handleDownloadVideo}
            isRecording={isRecording}
            schemeNames={schemeNames}
            onSave={handleSaveScheme}
            onLoad={handleLoadScheme}
            onDeleteScheme={handleDeleteScheme}
          />
        </aside>
      </div>
    </div>
  );
}
