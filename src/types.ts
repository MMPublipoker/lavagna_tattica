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

export type ZoneKind = 'freehand' | 'rect' | 'ellipse';

interface ZoneBase {
  id: string;
  color: string;
}

export interface FreehandZoneData extends ZoneBase {
  kind: 'freehand';
  points: number[];
}

export interface RectZoneData extends ZoneBase {
  kind: 'rect';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EllipseZoneData extends ZoneBase {
  kind: 'ellipse';
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
}

export type ZoneData = FreehandZoneData | RectZoneData | EllipseZoneData;

export type ToolMode = 'select' | 'run' | 'pass' | 'dribble' | 'draw' | 'erase';

export type Formation = '4-4-2' | '4-3-3' | '3-5-2';

export interface BoardState {
  players: PlayerData[];
  ball: BallData;
  arrows: ArrowData[];
  zones: ZoneData[];
}

export interface SavedScheme {
  name: string;
  savedAt: string;
  state: BoardState;
}
