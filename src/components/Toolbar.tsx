import { useState } from 'react';
import type { RealTeam } from '../serieATeams';
import type { Formation, Team, ToolMode, ZoneKind } from '../types';

interface ToolbarProps {
  mode: ToolMode;
  setMode: (mode: ToolMode) => void;
  highlightColor: string;
  setHighlightColor: (color: string) => void;
  zoneShape: ZoneKind;
  setZoneShape: (shape: ZoneKind) => void;
  penColor: string;
  setPenColor: (color: string) => void;
  formationA: Formation;
  formationB: Formation;
  setFormationA: (f: Formation) => void;
  setFormationB: (f: Formation) => void;
  onApplyFormations: () => void;
  realTeams: RealTeam[];
  realTeamAId: string | null;
  realTeamBId: string | null;
  onApplyRealTeam: (slot: Team, teamId: string) => void;
  onPlay: () => void;
  isPlaying: boolean;
  onUndo: () => void;
  canUndo: boolean;
  onClearArrows: () => void;
  onClearZones: () => void;
  onClearPen: () => void;
  sequenceStepsCount: number;
  maxSequenceSteps: number;
  canAddSequenceStep: boolean;
  onAddSequenceStep: () => void;
  onRemoveLastStep: () => void;
  onClearSequence: () => void;
  onPlaySequence: () => void;
  onDownloadVideo: () => void;
  isRecording: boolean;
  schemeNames: string[];
  onSave: (name: string) => void;
  onLoad: (name: string) => void;
  onDeleteScheme: (name: string) => void;
}

const FORMATIONS: Formation[] = [
  '4-4-2',
  '4-3-3',
  '3-5-2',
  '3-4-2-1',
  '4-3-2-1',
  '3-4-3',
  '4-2-3-1',
  '4-2-4',
  '4-1-4-1',
  '3-5-1-1',
  '3-4-1-2',
  '5-3-2',
  '5-4-1',
];

const MODE_BUTTONS: Array<{ mode: ToolMode; label: string }> = [
  { mode: 'select', label: '🖐️ Muovi' },
  { mode: 'run', label: '➔ Corsa' },
  { mode: 'pass', label: '┄➔ Passaggio' },
  { mode: 'dribble', label: '〜➔ Dribbling' },
  { mode: 'draw', label: '✏️ Zone' },
  { mode: 'pen', label: '✍️ Penna' },
  { mode: 'erase', label: '🧹 Gomma' },
];

const PEN_COLORS: Array<{ color: string; label: string }> = [
  { color: '#ffffff', label: 'Bianco' },
  { color: '#000000', label: 'Nero' },
  { color: '#ffd43b', label: 'Giallo' },
  { color: '#ff6b6b', label: 'Rosso' },
];

const HIGHLIGHT_COLORS: Array<{ color: string; label: string }> = [
  { color: '#ffd43b', label: 'Spazio libero' },
  { color: '#4dabf7', label: 'Squadra A' },
  { color: '#ff6b6b', label: 'Squadra B' },
  { color: '#51cf66', label: 'Pressing' },
];

const ZONE_SHAPES: Array<{ kind: ZoneKind; label: string }> = [
  { kind: 'freehand', label: '➰ Libero' },
  { kind: 'rect', label: '▭ Rettangolo' },
  { kind: 'ellipse', label: '⬭ Cerchio' },
];

export default function Toolbar({
  mode,
  setMode,
  highlightColor,
  setHighlightColor,
  zoneShape,
  setZoneShape,
  penColor,
  setPenColor,
  formationA,
  formationB,
  setFormationA,
  setFormationB,
  onApplyFormations,
  realTeams,
  realTeamAId,
  realTeamBId,
  onApplyRealTeam,
  onPlay,
  isPlaying,
  onUndo,
  canUndo,
  onClearArrows,
  onClearZones,
  onClearPen,
  sequenceStepsCount,
  maxSequenceSteps,
  canAddSequenceStep,
  onAddSequenceStep,
  onRemoveLastStep,
  onClearSequence,
  onPlaySequence,
  onDownloadVideo,
  isRecording,
  schemeNames,
  onSave,
  onLoad,
  onDeleteScheme,
}: ToolbarProps) {
  const [schemeName, setSchemeName] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('');
  const [pendingTeamA, setPendingTeamA] = useState('');
  const [pendingTeamB, setPendingTeamB] = useState('');
  const sortedRealTeams = [...realTeams].sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <span className="toolbar-label">Modalità</span>
        <div className="button-row">
          {MODE_BUTTONS.map((b) => (
            <button
              key={b.mode}
              className={mode === b.mode ? 'tool-btn active' : 'tool-btn'}
              onClick={() => setMode(b.mode)}
            >
              {b.label}
            </button>
          ))}
        </div>
        {mode === 'draw' && (
          <>
            <div className="button-row">
              {ZONE_SHAPES.map((s) => (
                <button
                  key={s.kind}
                  className={zoneShape === s.kind ? 'tool-btn active' : 'tool-btn'}
                  onClick={() => setZoneShape(s.kind)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="button-row">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.color}
                  className={highlightColor === c.color ? 'swatch-btn active' : 'swatch-btn'}
                  style={{ backgroundColor: c.color }}
                  title={c.label}
                  onClick={() => setHighlightColor(c.color)}
                />
              ))}
            </div>
          </>
        )}
        {mode === 'pen' && (
          <div className="button-row">
            {PEN_COLORS.map((c) => (
              <button
                key={c.color}
                className={penColor === c.color ? 'swatch-btn active' : 'swatch-btn'}
                style={{ backgroundColor: c.color }}
                title={c.label}
                onClick={() => setPenColor(c.color)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="toolbar-group">
        <span className="toolbar-label">Formazioni</span>
        <div className="button-row">
          <label className="team-label team-a">
            Squadra A
            <select value={formationA} onChange={(e) => setFormationA(e.target.value as Formation)}>
              {FORMATIONS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
          <label className="team-label team-b">
            Squadra B
            <select value={formationB} onChange={(e) => setFormationB(e.target.value as Formation)}>
              {FORMATIONS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
          <button className="tool-btn" onClick={onApplyFormations} disabled={isPlaying}>
            ↺ Reset posizioni
          </button>
        </div>
      </div>

      <div className="toolbar-group">
        <span className="toolbar-label">Squadre Serie A</span>
        <div className="button-row">
          <label className="team-label team-a">
            Squadra A
            <select value={pendingTeamA} onChange={(e) => setPendingTeamA(e.target.value)}>
              <option value="">-- generica --</option>
              {sortedRealTeams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </label>
          <button className="tool-btn" onClick={() => onApplyRealTeam('A', pendingTeamA)} disabled={isPlaying}>
            📥 Carica
          </button>
          {realTeamAId && <span className="team-loaded-hint">{sortedRealTeams.find((t) => t.id === realTeamAId)?.nome}</span>}
        </div>
        <div className="button-row">
          <label className="team-label team-b">
            Squadra B
            <select value={pendingTeamB} onChange={(e) => setPendingTeamB(e.target.value)}>
              <option value="">-- generica --</option>
              {sortedRealTeams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </label>
          <button className="tool-btn" onClick={() => onApplyRealTeam('B', pendingTeamB)} disabled={isPlaying}>
            📥 Carica
          </button>
          {realTeamBId && <span className="team-loaded-hint">{sortedRealTeams.find((t) => t.id === realTeamBId)?.nome}</span>}
        </div>
      </div>

      <div className="toolbar-group">
        <span className="toolbar-label">Azioni</span>
        <div className="button-row">
          <button className="tool-btn" onClick={onPlay} disabled={isPlaying}>
            ▶ Play
          </button>
          <button className="tool-btn" onClick={onUndo} disabled={!canUndo || isPlaying}>
            ⤺ Annulla
          </button>
          <button className="tool-btn" onClick={onClearArrows}>
            ✕ Pulisci freccette
          </button>
          <button className="tool-btn" onClick={onClearZones}>
            ✕ Pulisci zone
          </button>
          <button className="tool-btn" onClick={onClearPen}>
            ✕ Pulisci penna
          </button>
        </div>
      </div>

      <div className="toolbar-group">
        <span className="toolbar-label">Sequenza video</span>
        <div className="button-row">
          <span className="team-loaded-hint">
            Fase {sequenceStepsCount}/{maxSequenceSteps}
          </span>
          <button className="tool-btn" onClick={onAddSequenceStep} disabled={!canAddSequenceStep || isRecording}>
            ➕ Aggiungi fase
          </button>
          <button
            className="tool-btn"
            onClick={onRemoveLastStep}
            disabled={sequenceStepsCount === 0 || isRecording}
          >
            ↩︎ Rimuovi ultima
          </button>
          <button
            className="tool-btn"
            onClick={onClearSequence}
            disabled={sequenceStepsCount === 0 || isRecording}
          >
            🗑️ Svuota sequenza
          </button>
        </div>
        <div className="button-row">
          <button
            className="tool-btn"
            onClick={onPlaySequence}
            disabled={sequenceStepsCount === 0 || isRecording}
          >
            🎬 Play sequenza
          </button>
          <button
            className="tool-btn"
            onClick={onDownloadVideo}
            disabled={sequenceStepsCount === 0 || isRecording}
          >
            ⬇️ Scarica video
          </button>
        </div>
      </div>

      <div className="toolbar-group">
        <span className="toolbar-label">Schemi salvati</span>
        <div className="button-row">
          <input
            type="text"
            placeholder="Nome schema"
            value={schemeName}
            onChange={(e) => setSchemeName(e.target.value)}
          />
          <button
            className="tool-btn"
            onClick={() => {
              if (!schemeName.trim()) return;
              onSave(schemeName.trim());
              setSchemeName('');
            }}
          >
            💾 Salva
          </button>
          <select value={selectedScheme} onChange={(e) => setSelectedScheme(e.target.value)}>
            <option value="">-- seleziona --</option>
            {schemeNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            className="tool-btn"
            disabled={!selectedScheme}
            onClick={() => selectedScheme && onLoad(selectedScheme)}
          >
            📂 Carica
          </button>
          <button
            className="tool-btn"
            disabled={!selectedScheme}
            onClick={() => {
              if (!selectedScheme) return;
              onDeleteScheme(selectedScheme);
              setSelectedScheme('');
            }}
          >
            🗑️ Elimina
          </button>
        </div>
      </div>
    </div>
  );
}
