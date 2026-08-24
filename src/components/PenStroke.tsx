import { Line } from 'react-konva';
import type { PenStrokeData } from '../types';

interface PenStrokeProps {
  data: PenStrokeData;
  onClick?: (id: string) => void;
  erasable: boolean;
}

export default function PenStroke({ data, onClick, erasable }: PenStrokeProps) {
  const handleClick = erasable && onClick ? () => onClick(data.id) : undefined;

  return (
    <Line
      points={data.points}
      stroke={data.color}
      strokeWidth={4}
      lineCap="round"
      lineJoin="round"
      tension={0}
      shadowColor="#000000"
      shadowOpacity={0.35}
      shadowBlur={2}
      hitStrokeWidth={16}
      onClick={handleClick}
      onTap={handleClick}
      listening={erasable}
    />
  );
}
