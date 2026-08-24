import type Konva from 'konva';
import { Circle, Group } from 'react-konva';
import type { BallData } from '../types';

interface BallTokenProps {
  data: BallData;
  radius: number;
  draggable: boolean;
  onDragStart: () => void;
  onDragMove: (id: string, x: number, y: number) => void;
  onDragEnd: () => void;
}

export default function BallToken({ data, radius, draggable, onDragStart, onDragMove, onDragEnd }: BallTokenProps) {
  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    onDragMove(data.id, e.target.x(), e.target.y());
  };

  return (
    <Group
      x={data.x}
      y={data.y}
      id={data.id}
      name="token"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragMove={handleDragMove}
      onDragEnd={onDragEnd}
    >
      <Circle
        radius={radius}
        fill="#ffffff"
        stroke="#212529"
        strokeWidth={1.5}
        shadowColor="black"
        shadowOpacity={0.35}
        shadowBlur={3}
        shadowOffset={{ x: 0, y: 1 }}
      />
    </Group>
  );
}
