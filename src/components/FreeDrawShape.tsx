import { Line } from 'react-konva';
import type { FreeDrawData } from '../types';

interface FreeDrawShapeProps {
  data: FreeDrawData;
  onClick?: (id: string) => void;
  erasable: boolean;
}

export default function FreeDrawShape({ data, onClick, erasable }: FreeDrawShapeProps) {
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
      onClick={erasable && onClick ? () => onClick(data.id) : undefined}
      onTap={erasable && onClick ? () => onClick(data.id) : undefined}
      listening={erasable}
    />
  );
}
