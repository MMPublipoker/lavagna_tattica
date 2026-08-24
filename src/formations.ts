import type { RealPlayer, RealTeam } from './serieATeams';
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

interface FormationSlots {
  gk: { x: number; y: number };
  lines: { x: number; y: number }[][];
}

function formationSlots(team: Team, formation: Formation, width: number, height: number): FormationSlots {
  const lineCounts = LINE_COUNTS[formation];
  const margin = height * 0.09;
  const mirror = team === 'B';
  const xFor = (frac: number) => (mirror ? 1 - frac : frac) * width;
  const xFractions = lineXFractions(lineCounts.length);

  return {
    gk: { x: xFor(GK_X_FRACTION), y: height / 2 },
    lines: lineCounts.map((count, lineIndex) =>
      lineSpread(count, height, margin).map((y) => ({ x: xFor(xFractions[lineIndex]), y })),
    ),
  };
}

export function buildFormation(team: Team, formation: Formation, width: number, height: number): PlayerData[] {
  const slots = formationSlots(team, formation, width, height);
  const players: PlayerData[] = [];
  let shirt = 1;

  players.push({ id: `${team}-${shirt}`, team, number: shirt, ...slots.gk });
  shirt += 1;

  for (const line of slots.lines) {
    for (const { x, y } of line) {
      players.push({ id: `${team}-${shirt}`, team, number: shirt, x, y });
      shirt += 1;
    }
  }

  return players;
}

const PLACEHOLDER_PLAYER: RealPlayer = { nome: 'N/D', numero: null };

// Pulls `count` players from `pool` starting at `offset`, padding with a
// placeholder if the roster doesn't have enough players in that role.
function takeFromPool(pool: RealPlayer[], offset: number, count: number): RealPlayer[] {
  return Array.from({ length: count }, (_, i) => pool[offset + i] ?? PLACEHOLDER_PLAYER);
}

// Maps a real squad onto a formation's slots: the first line is filled from
// difensori, the last line from attaccanti, and every line in between
// (defensive/attacking midfielders alike) from centrocampisti, in order.
export function buildRealTeamFormation(
  team: Team,
  realTeam: RealTeam,
  formation: Formation,
  width: number,
  height: number,
): PlayerData[] {
  const slots = formationSlots(team, formation, width, height);
  const players: PlayerData[] = [];
  const gk = realTeam.portieri[0] ?? PLACEHOLDER_PLAYER;

  players.push({
    id: `${team}-gk`,
    team,
    number: gk.numero ?? 1,
    name: gk.nome,
    ...slots.gk,
  });

  let midfieldOffset = 0;
  slots.lines.forEach((line, lineIndex) => {
    const isFirstLine = lineIndex === 0;
    const isLastLine = lineIndex === slots.lines.length - 1;
    const pool = isFirstLine ? realTeam.difensori : isLastLine ? realTeam.attaccanti : realTeam.centrocampisti;
    const offset = isFirstLine || isLastLine ? 0 : midfieldOffset;
    const picks = takeFromPool(pool, offset, line.length);
    if (!isFirstLine && !isLastLine) midfieldOffset += line.length;

    line.forEach(({ x, y }, i) => {
      const pick = picks[i];
      players.push({
        id: `${team}-${lineIndex}-${i}`,
        team,
        number: pick.numero ?? 0,
        name: pick.nome,
        x,
        y,
      });
    });
  });

  return players;
}
