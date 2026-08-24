import type { Formation, PlayerData, Team } from './types';

// Each formation is described as an array of outfield line sizes (GK excluded),
// ordered from the defensive line to the most advanced one. They must sum to 10.
const LINE_COUNTS: Record<Formation, number[]> = {
  '4-4-2': [4, 4, 2],
  '4-3-3': [4, 3, 3],
  '3-5-2': [3, 5, 2],
  '3-4-2-1': [3, 4, 2, 1],
  '4-3-2-1': [4, 3, 2, 1],
  '3-4-3': [3, 4, 3],
  '4-2-3-1': [4, 2, 3, 1],
  '4-2-4': [4, 2, 4],
  '4-1-4-1': [4, 1, 4, 1],
  '3-5-1-1': [3, 5, 1, 1],
  '3-4-1-2': [3, 4, 1, 2],
  '5-3-2': [5, 3, 2],
  '5-4-1': [5, 4, 1],
};

// The pitch is drawn horizontally (goals on the left/right), so "depth" — from
// goalkeeper to attack — runs along x, and each line spreads out along y.
const GK_X_FRACTION = 0.94;
const DEFENSIVE_LINE_X_FRACTION = 0.82;
const ATTACKING_LINE_X_FRACTION = 0.4;

function lineSpread(count: number, height: number, margin: number): number[] {
  const spread = height - margin * 2;
  return Array.from({ length: count }, (_, i) => margin + (spread * (i + 0.5)) / count);
}

// Spreads the outfield lines evenly between the defensive and attacking depth,
// for any number of lines (3-line and 4-line formations alike).
function lineXFractions(lineCount: number): number[] {
  if (lineCount === 1) return [DEFENSIVE_LINE_X_FRACTION];
  const step = (DEFENSIVE_LINE_X_FRACTION - ATTACKING_LINE_X_FRACTION) / (lineCount - 1);
  return Array.from({ length: lineCount }, (_, i) => DEFENSIVE_LINE_X_FRACTION - i * step);
}

export function buildFormation(
  team: Team,
  formation: Formation,
  width: number,
  height: number,
): PlayerData[] {
  const lineCounts = LINE_COUNTS[formation];
  const margin = height * 0.09;
  const mirror = team === 'B';
  const xFor = (frac: number) => (mirror ? 1 - frac : frac) * width;

  const players: PlayerData[] = [];
  let shirt = 1;

  players.push({ id: `${team}-${shirt}`, team, number: shirt, x: xFor(GK_X_FRACTION), y: height / 2 });
  shirt += 1;

  const xFractions = lineXFractions(lineCounts.length);

  lineCounts.forEach((count, lineIndex) => {
    const ys = lineSpread(count, height, margin);
    for (const y of ys) {
      players.push({ id: `${team}-${shirt}`, team, number: shirt, x: xFor(xFractions[lineIndex]), y });
      shirt += 1;
    }
  });

  return players;
}
