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

const GK_Y_FRACTION = 0.94;
const DEFENSIVE_LINE_Y_FRACTION = 0.82;
const ATTACKING_LINE_Y_FRACTION = 0.4;

function lineX(count: number, width: number, margin: number): number[] {
  const spread = width - margin * 2;
  return Array.from({ length: count }, (_, i) => margin + (spread * (i + 0.5)) / count);
}

// Spreads the outfield lines evenly between the defensive and attacking depth,
// for any number of lines (3-line and 4-line formations alike).
function lineYFractions(lineCount: number): number[] {
  if (lineCount === 1) return [DEFENSIVE_LINE_Y_FRACTION];
  const step = (DEFENSIVE_LINE_Y_FRACTION - ATTACKING_LINE_Y_FRACTION) / (lineCount - 1);
  return Array.from({ length: lineCount }, (_, i) => DEFENSIVE_LINE_Y_FRACTION - i * step);
}

export function buildFormation(
  team: Team,
  formation: Formation,
  width: number,
  height: number,
): PlayerData[] {
  const lineCounts = LINE_COUNTS[formation];
  const margin = width * 0.09;
  const mirror = team === 'B';
  const yFor = (frac: number) => (mirror ? 1 - frac : frac) * height;

  const players: PlayerData[] = [];
  let shirt = 1;

  players.push({ id: `${team}-${shirt}`, team, number: shirt, x: width / 2, y: yFor(GK_Y_FRACTION) });
  shirt += 1;

  const yFractions = lineYFractions(lineCounts.length);

  lineCounts.forEach((count, lineIndex) => {
    const xs = lineX(count, width, margin);
    for (const x of xs) {
      players.push({ id: `${team}-${shirt}`, team, number: shirt, x, y: yFor(yFractions[lineIndex]) });
      shirt += 1;
    }
  });

  return players;
}
