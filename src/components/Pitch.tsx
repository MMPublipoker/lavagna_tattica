import { Circle, Line, Rect } from 'react-konva';

interface PitchProps {
  width: number;
  height: number;
}

const LINE_COLOR = '#e8f5ec';
const LINE_WIDTH = 2;

export default function Pitch({ width, height }: PitchProps) {
  const centerX = width / 2;
  const centerY = height / 2;
  const penaltyAreaW = width * 0.44;
  const penaltyAreaH = height * 0.18;
  const goalAreaW = width * 0.22;
  const goalAreaH = height * 0.07;
  const centerCircleR = height * 0.16;

  return (
    <>
      <Rect x={0} y={0} width={width} height={height} fill="#2f9e44" />
      <Rect
        x={width * 0.03}
        y={height * 0.03}
        width={width * 0.94}
        height={height * 0.94}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Line points={[width * 0.03, centerY, width * 0.97, centerY]} stroke={LINE_COLOR} strokeWidth={LINE_WIDTH} />
      <Circle x={centerX} y={centerY} radius={centerCircleR} stroke={LINE_COLOR} strokeWidth={LINE_WIDTH} />
      <Circle x={centerX} y={centerY} radius={3} fill={LINE_COLOR} />

      {/* Top penalty & goal area */}
      <Rect
        x={centerX - penaltyAreaW / 2}
        y={height * 0.03}
        width={penaltyAreaW}
        height={penaltyAreaH}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={centerX - goalAreaW / 2}
        y={height * 0.03}
        width={goalAreaW}
        height={goalAreaH}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />

      {/* Bottom penalty & goal area */}
      <Rect
        x={centerX - penaltyAreaW / 2}
        y={height * 0.97 - penaltyAreaH}
        width={penaltyAreaW}
        height={penaltyAreaH}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={centerX - goalAreaW / 2}
        y={height * 0.97 - goalAreaH}
        width={goalAreaW}
        height={goalAreaH}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
    </>
  );
}
