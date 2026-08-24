export type Team = 'A' | 'B';

export interface PlayerData {
  id: string;
  team: Team;
  number: number;
  name?: string;
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
  opacity?: number;
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

export interface PenStrokeData {
  id: string;
  points: number[];
  color: string;
}

export type ToolMode = 'select' | 'run' | 'pass' | 'dribble' | 'draw' | 'pen' | 'erase';

export type Formation =
  | '4-4-2'
  | '4-3-3'
  | '3-5-2'
  | '3-4-2-1'
  | '4-3-2-1'
  | '3-4-3'
  | '4-2-3-1'
  | '4-2-4'
  | '4-1-4-1'
  | '3-5-1-1'
  | '3-4-1-2'
  | '5-3-2'
  | '5-4-1';

export interface BoardState {
  players: PlayerData[];
  ball: BallData;
  arrows: ArrowData[];
  zones: ZoneData[];
  penStrokes: PenStrokeData[];
}

export interface SequenceStep {
  id: string;
  arrows: ArrowData[];
  zones: ZoneData[];
  penStrokes: PenStrokeData[];
}

export interface SavedScheme {
  name: string;
  savedAt: string;
  state: BoardState;
}
