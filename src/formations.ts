import type { Formation, PlayerData, Team } from './types';

// All supported formations use the same shape: GK + 3 outfield lines
// (defence, midfield, attack) with a different player count per line.
const LINE_COUNTS: Record<Formation, [number, number, number]> = {
  '4-4-2': [4, 4, 2],
  '4-3-3': [4, 3, 3],
  '3-5-2': [3, 5, 2],
};

// Fraction of pitch height for each line, for the team attacking upward (toward y = 0).
const Y_FRACTIONS = { gk: 0.94, def: 0.8, mid: 0.6, fwd: 0.42 };

function lineX(count: number, width: number, margin: number): number[] {
  const spread = width - margin * 2;
  return Array.from({ length: count }, (_, i) => margin + (spread * (i + 0.5)) / count);
}

export function buildFormation(
  team: Team,
  formation: Formation,
  width: number,
  height: number,
): PlayerData[] {
  const [defCount, midCount, fwdCount] = LINE_COUNTS[formation];
  const margin = width * 0.09;
  const mirror = team === 'B';
  const yFor = (frac: number) => (mirror ? 1 - frac : frac) * height;

  const players: PlayerData[] = [];
  let shirt = 1;

  players.push({ id: `${team}-${shirt}`, team, number: shirt, x: width / 2, y: yFor(Y_FRACTIONS.gk) });
  shirt += 1;

  const lines: Array<{ count: number; yFrac: number }> = [
    { count: defCount, yFrac: Y_FRACTIONS.def },
    { count: midCount, yFrac: Y_FRACTIONS.mid },
    { count: fwdCount, yFrac: Y_FRACTIONS.fwd },
  ];

  for (const line of lines) {
    const xs = lineX(line.count, width, margin);
    for (const x of xs) {
      players.push({ id: `${team}-${shirt}`, team, number: shirt, x, y: yFor(line.yFrac) });
      shirt += 1;
    }
  }

  return players;
}
