import { Ellipse, Line, Rect } from 'react-konva';
import type { ZoneData } from '../types';

interface ZoneShapeProps {
  data: ZoneData;
  onClick?: (id: string) => void;
  erasable: boolean;
}

export default function ZoneShape({ data, onClick, erasable }: ZoneShapeProps) {
  const handleClick = erasable && onClick ? () => onClick(data.id) : undefined;

  if (data.kind === 'freehand') {
    return (
      <Line
        points={data.points}
        stroke={data.color}
        strokeWidth={26}
        opacity={0.4}
        lineCap="round"
        lineJoin="round"
        tension={0.3}
        hitStrokeWidth={30}
        onClick={handleClick}
        onTap={handleClick}
        listening={erasable}
      />
    );
  }

  if (data.kind === 'rect') {
    return (
      <Rect
        x={data.x}
        y={data.y}
        width={data.width}
        height={data.height}
        fill={data.color}
        opacity={0.35}
        stroke={data.color}
        strokeWidth={2}
        cornerRadius={4}
        onClick={handleClick}
        onTap={handleClick}
        listening={erasable}
      />
    );
  }

  return (
    <Ellipse
      x={data.x}
      y={data.y}
      radiusX={data.radiusX}
      radiusY={data.radiusY}
      fill={data.color}
      opacity={0.35}
      stroke={data.color}
      strokeWidth={2}
      onClick={handleClick}
      onTap={handleClick}
      listening={erasable}
    />
  );
}
