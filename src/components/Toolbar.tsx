import { useState } from 'react';
import type { Formation, ToolMode, ZoneKind } from '../types';

interface ToolbarProps {
  mode: ToolMode;
  setMode: (mode: ToolMode) => void;
  highlightColor: string;
  setHighlightColor: (color: string) => void;
  zoneShape: ZoneKind;
  setZoneShape: (shape: ZoneKind) => void;
  formationA: Formation;
  formationB: Formation;
  setFormationA: (f: Formation) => void;
  setFormationB: (f: Formation) => void;
  onApplyFormations: () => void;
  onPlay: () => void;
  isPlaying: boolean;
  onUndo: () => void;
  canUndo: boolean;
  onClearArrows: () => void;
  onClearZones: () => void;
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
  { mode: 'erase', label: '🧹 Gomma' },
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
  formationA,
  formationB,
  setFormationA,
  setFormationB,
  onApplyFormations,
  onPlay,
  isPlaying,
  onUndo,
  canUndo,
  onClearArrows,
  onClearZones,
  schemeNames,
  onSave,
  onLoad,
  onDeleteScheme,
}: ToolbarProps) {
  const [schemeName, setSchemeName] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('');

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
          <button className="tool-btn" onClick={onApplyFormations}>
            ↺ Reset posizioni
          </button>
        </div>
      </div>

      <div className="toolbar-group">
        <span className="toolbar-label">Azioni</span>
        <div className="button-row">
          <button className="tool-btn" onClick={onPlay} disabled={isPlaying}>
            ▶ Play
          </button>
          <button className="tool-btn" onClick={onUndo} disabled={!canUndo}>
            ⤺ Annulla
          </button>
          <button className="tool-btn" onClick={onClearArrows}>
            ✕ Pulisci freccette
          </button>
          <button className="tool-btn" onClick={onClearZones}>
            ✕ Pulisci zone
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
