import type { BoardState, SavedScheme } from './types';

const STORAGE_KEY = 'lavagna-tattica:schemes';

export function loadSchemes(): SavedScheme[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedScheme[];
  } catch {
    return [];
  }
}

function persist(schemes: SavedScheme[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schemes));
}

export function saveScheme(name: string, state: BoardState): SavedScheme[] {
  const schemes = loadSchemes().filter((s) => s.name !== name);
  schemes.push({ name, savedAt: new Date().toISOString(), state });
  persist(schemes);
  return schemes;
}

export function deleteScheme(name: string): SavedScheme[] {
  const schemes = loadSchemes().filter((s) => s.name !== name);
  persist(schemes);
  return schemes;
}
