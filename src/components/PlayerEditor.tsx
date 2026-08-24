import { useState } from 'react';
import type { PlayerData } from '../types';

interface PlayerEditorProps {
  player: PlayerData;
  onSave: (name: string, number: number) => void;
  onClose: () => void;
}

export default function PlayerEditor({ player, onSave, onClose }: PlayerEditorProps) {
  const [name, setName] = useState(player.name ?? '');
  const [number, setNumber] = useState(String(player.number));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(number, 10);
    onSave(name, Number.isFinite(parsed) ? parsed : player.number);
  };

  return (
    <form className="player-editor" onSubmit={handleSubmit}>
      <span className="toolbar-label">Modifica giocatore</span>
      <div className="button-row">
        <input
          type="text"
          placeholder="Nome giocatore"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <input
          type="number"
          placeholder="N."
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="player-editor-number"
        />
        <button type="submit" className="tool-btn">
          ✓ Applica
        </button>
        <button type="button" className="tool-btn" onClick={onClose}>
          ✕ Chiudi
        </button>
      </div>
    </form>
  );
}
