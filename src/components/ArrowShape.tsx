import { Arrow } from 'react-konva';
import type { ArrowData } from '../types';

interface ArrowShapeProps {
  data: ArrowData;
  onClick?: (id: string) => void;
  erasable: boolean;
}

function zigzagPoints(x1: number, y1: number, x2: number, y2: number, segments = 7, amplitude = 7): number[] {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;

  const points: number[] = [x1, y1];
  for (let i = 1; i < segments; i += 1) {
    const t = i / segments;
    const side = i % 2 === 0 ? 1 : -1;
    points.push(x1 + dx * t + nx * amplitude * side, y1 + dy * t + ny * amplitude * side);
  }
  points.push(x2, y2);
  return points;
}

const ARROW_COLOR = '#212529';

export default function ArrowShape({ data, onClick, erasable }: ArrowShapeProps) {
  const [x1, y1, x2, y2] = data.points;

  const points = data.style === 'dribble' ? zigzagPoints(x1, y1, x2, y2) : [x1, y1, x2, y2];
  const dash = data.style === 'pass' ? [12, 8] : undefined;

  return (
    <Arrow
      points={points}
      stroke={ARROW_COLOR}
      fill={ARROW_COLOR}
      strokeWidth={3}
      opacity={data.opacity ?? 1}
      dash={dash}
      pointerLength={12}
      pointerWidth={12}
      hitStrokeWidth={16}
      onClick={erasable && onClick ? () => onClick(data.id) : undefined}
      onTap={erasable && onClick ? () => onClick(data.id) : undefined}
      listening={erasable}
    />
  );
}
