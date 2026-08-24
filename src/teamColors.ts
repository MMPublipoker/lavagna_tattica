export interface TokenColors {
  fill: string;
  stroke: string;
  text: string;
}

export const DEFAULT_TEAM_COLORS: Record<'A' | 'B', TokenColors> = {
  A: { fill: '#1c7ed6', stroke: '#0b4a8f', text: '#ffffff' },
  B: { fill: '#e03131', stroke: '#8a1f1f', text: '#ffffff' },
};

function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function tokenColorsFromTeamKit(primaryHex: string, secondaryHex: string): TokenColors {
  return {
    fill: primaryHex,
    stroke: secondaryHex,
    text: relativeLuminance(primaryHex) > 0.6 ? '#111111' : '#ffffff',
  };
}
