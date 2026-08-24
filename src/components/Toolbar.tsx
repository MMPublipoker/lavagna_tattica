import { useState } from 'react';
import type { Formation, ToolMode } from '../types';

interface ToolbarProps {
  mode: ToolMode;
  setMode: (mode: ToolMode) => void;
  highlightColor: string;
  setHighlightColor: (color: string) => void;
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
  onClearFreeDraws: () => void;
  schemeNames: string[];
  onSave: (name: string) => void;
  onLoad: (name: string) => void;
  onDeleteScheme: (name: string) => void;
}

const FORMATIONS: Formation[] = ['4-4-2', '4-3-3', '3-5-2'];

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

export default function Toolbar({
  mode,
  setMode,
  highlightColor,
  setHighlightColor,
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
  onClearFreeDraws,
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
          <button className="tool-btn" onClick={onClearFreeDraws}>
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
