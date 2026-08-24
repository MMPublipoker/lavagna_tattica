export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

export function makeId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function surname(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1] ?? fullName;
}

export interface ShapeDraft {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function draftToRect(draft: ShapeDraft): { x: number; y: number; width: number; height: number } {
  return {
    x: Math.min(draft.startX, draft.endX),
    y: Math.min(draft.startY, draft.endY),
    width: Math.abs(draft.endX - draft.startX),
    height: Math.abs(draft.endY - draft.startY),
  };
}

export function draftToEllipse(draft: ShapeDraft): { x: number; y: number; radiusX: number; radiusY: number } {
  return {
    x: (draft.startX + draft.endX) / 2,
    y: (draft.startY + draft.endY) / 2,
    radiusX: Math.abs(draft.endX - draft.startX) / 2,
    radiusY: Math.abs(draft.endY - draft.startY) / 2,
  };
}
