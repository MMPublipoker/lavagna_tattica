import type Konva from 'konva';
import { Circle, Group, Text } from 'react-konva';
import type { PlayerData } from '../types';

interface PlayerTokenProps {
  data: PlayerData;
  radius: number;
  draggable: boolean;
  selected: boolean;
  onDragStart: () => void;
  onDragMove: (id: string, x: number, y: number) => void;
  onDragEnd: () => void;
}

const TEAM_COLORS: Record<PlayerData['team'], { fill: string; stroke: string; text: string }> = {
  A: { fill: '#1c7ed6', stroke: '#0b4a8f', text: '#ffffff' },
  B: { fill: '#e03131', stroke: '#8a1f1f', text: '#ffffff' },
};

export default function PlayerToken({
  data,
  radius,
  draggable,
  selected,
  onDragStart,
  onDragMove,
  onDragEnd,
}: PlayerTokenProps) {
  const colors = TEAM_COLORS[data.team];

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
        fill={colors.fill}
        stroke={selected ? '#ffd43b' : colors.stroke}
        strokeWidth={selected ? 3 : 2}
        shadowColor="black"
        shadowOpacity={0.35}
        shadowBlur={4}
        shadowOffset={{ x: 0, y: 1 }}
      />
      <Text
        text={String(data.number)}
        fontSize={radius}
        fontStyle="bold"
        fill={colors.text}
        width={radius * 2}
        height={radius * 2}
        offsetX={radius}
        offsetY={radius}
        align="center"
        verticalAlign="middle"
        listening={false}
      />
    </Group>
  );
}
