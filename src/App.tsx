import type Konva from 'konva';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import './App.css';
import ArrowShape from './components/ArrowShape';
import BallToken from './components/BallToken';
import Pitch from './components/Pitch';
import PlayerToken from './components/PlayerToken';
import Toolbar from './components/Toolbar';
import { buildFormation } from './formations';
import { deleteScheme, loadSchemes, saveScheme } from './schemes';
import type { ArrowData, BoardState, Formation, ToolMode } from './types';
import { easeInOutQuad, lerp, makeId } from './utils';

const PITCH_WIDTH = 900;
const PITCH_HEIGHT = 580;
const PLAYER_RADIUS = 16;
const BALL_RADIUS = 8;
const ANIMATION_DURATION_MS = 900;
const HISTORY_LIMIT = 50;

function initialState(formationA: Formation, formationB: Formation): BoardState {
  return {
    players: [
      ...buildFormation('A', formationA, PITCH_WIDTH, PITCH_HEIGHT),
      ...buildFormation('B', formationB, PITCH_WIDTH, PITCH_HEIGHT),
    ],
    ball: { id: 'ball', x: PITCH_WIDTH / 2, y: PITCH_HEIGHT / 2 },
    arrows: [],
  };
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
  const [schemeNames, setSchemeNames] = useState<string[]>([]);
  const [containerWidth, setContainerWidth] = useState(PITCH_WIDTH);

  const historyRef = useRef<BoardState[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const scale = Math.min(1, containerWidth / PITCH_WIDTH);

  const pushHistory = useCallback(() => {
    historyRef.current.push(board);
    if (historyRef.current.length > HISTORY_LIMIT) historyRef.current.shift();
    setCanUndo(true);
  }, [board]);

  const handleUndo = useCallback(() => {
    const previous = historyRef.current.pop();
    if (!previous) return;
    setBoard(previous);
    setCanUndo(historyRef.current.length > 0);
  }, []);

  const handleApplyFormations = useCallback(() => {
    pushHistory();
    setBoard(initialState(formationA, formationB));
  }, [formationA, formationB, pushHistory]);

  const handleClearArrows = useCallback(() => {
    pushHistory();
    setBoard((b) => ({ ...b, arrows: [] }));
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
    if (!drawingArrow) return;
    const stage = e.target.getStage();
    if (!stage) return;
    const pointer = getPointer(stage);
    if (!pointer) return;
    setDrawingArrow((d) => (d ? { ...d, endX: pointer.x, endY: pointer.y } : d));
  };

  const handlePointerUp = () => {
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

  const handleEraseArrow = useCallback(
    (id: string) => {
      pushHistory();
      setBoard((b) => ({ ...b, arrows: b.arrows.filter((a) => a.id !== id) }));
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

  const handlePlay = useCallback(() => {
    const moves = new Map<string, ArrowData>();
    for (const arrow of board.arrows) {
      if (arrow.targetId) moves.set(arrow.targetId, arrow);
    }
    if (moves.size === 0) return;

    const startPositions = new Map<string, { x: number; y: number }>();
    for (const p of board.players) startPositions.set(p.id, { x: p.x, y: p.y });
    startPositions.set(board.ball.id, { x: board.ball.x, y: board.ball.y });

    setIsPlaying(true);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / ANIMATION_DURATION_MS);
      const eased = easeInOutQuad(t);

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
      }));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsPlaying(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [board.arrows, board.ball, board.players]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

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
    setBoard(scheme.state);
  }, [pushHistory]);

  const handleDeleteScheme = useCallback((name: string) => {
    const updated = deleteScheme(name);
    setSchemeNames(updated.map((s) => s.name));
  }, []);

  const previewArrow: ArrowData | null = useMemo(() => {
    if (!drawingArrow) return null;
    return {
      id: 'preview',
      points: [drawingArrow.startX, drawingArrow.startY, drawingArrow.endX, drawingArrow.endY],
      style: mode === 'select' || mode === 'erase' ? 'run' : mode,
    };
  }, [drawingArrow, mode]);

  return (
    <div className="app">
      <h1>Lavagna Tattica Calcio</h1>
      <Toolbar
        mode={mode}
        setMode={setMode}
        formationA={formationA}
        formationB={formationB}
        setFormationA={setFormationA}
        setFormationB={setFormationB}
        onApplyFormations={handleApplyFormations}
        onPlay={handlePlay}
        isPlaying={isPlaying}
        onUndo={handleUndo}
        canUndo={canUndo}
        onClearArrows={handleClearArrows}
        schemeNames={schemeNames}
        onSave={handleSaveScheme}
        onLoad={handleLoadScheme}
        onDeleteScheme={handleDeleteScheme}
      />
      <div className="pitch-container" ref={containerRef}>
        <Stage
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
            {board.arrows.map((arrow) => (
              <ArrowShape key={arrow.id} data={arrow} erasable={mode === 'erase'} onClick={handleEraseArrow} />
            ))}
            {previewArrow && <ArrowShape data={previewArrow} erasable={false} />}
          </Layer>
          <Layer>
            {board.players.map((p) => (
              <PlayerToken
                key={p.id}
                data={p}
                radius={PLAYER_RADIUS}
                draggable={mode === 'select' && !isPlaying}
                selected={false}
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
        </Stage>
      </div>
      <p className="hint">
        Modalità "Muovi": trascina giocatori e palla. Modalità corsa/passaggio/dribbling: disegna una freccia da un
        giocatore (o dalla palla) verso la posizione di destinazione, poi premi Play per animare i movimenti.
      </p>
    </div>
  );
}
