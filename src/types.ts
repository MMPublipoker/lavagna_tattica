export type Team = 'A' | 'B';

export interface PlayerData {
  id: string;
  team: Team;
  number: number;
  x: number;
  y: number;
}

export interface BallData {
  id: string;
  x: number;
  y: number;
}

export type ArrowStyle = 'run' | 'pass' | 'dribble';

export interface ArrowData {
  id: string;
  points: [number, number, number, number];
  style: ArrowStyle;
  targetId?: string;
}

export type ToolMode = 'select' | 'run' | 'pass' | 'dribble' | 'erase';

export type Formation = '4-4-2' | '4-3-3' | '3-5-2';

export interface BoardState {
  players: PlayerData[];
  ball: BallData;
  arrows: ArrowData[];
}

export interface SavedScheme {
  name: string;
  savedAt: string;
  state: BoardState;
}
