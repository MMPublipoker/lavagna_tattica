import type Konva from 'konva';
import { Circle, Group, Text } from 'react-konva';
import type { TokenColors } from '../teamColors';
import type { PlayerData } from '../types';
import { surname } from '../utils';

interface PlayerTokenProps {
  data: PlayerData;
  radius: number;
  colors: TokenColors;
  nameFontFamily: string;
  draggable: boolean;
  selected: boolean;
  onSelect?: (id: string) => void;
  onDragStart: () => void;
  onDragMove: (id: string, x: number, y: number) => void;
  onDragEnd: () => void;
}

export default function PlayerToken({
  data,
  radius,
  colors,
  nameFontFamily,
  draggable,
  selected,
  onSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
}: PlayerTokenProps) {
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
      onClick={onSelect ? () => onSelect(data.id) : undefined}
      onTap={onSelect ? () => onSelect(data.id) : undefined}
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
        fontFamily={nameFontFamily}
        fill={colors.text}
        width={radius * 2}
        height={radius * 2}
        offsetX={radius}
        offsetY={radius}
        align="center"
        verticalAlign="middle"
        listening={false}
      />
      {data.name && (
        <Text
          text={surname(data.name)}
          fontSize={radius * 0.62}
          fontFamily={nameFontFamily}
          fill="#000000"
          width={radius * 6}
          offsetX={radius * 3}
          y={radius + 3}
          align="center"
          listening={false}
        />
      )}
    </Group>
  );
}
