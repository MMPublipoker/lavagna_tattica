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
  const penaltyAreaDepth = width * 0.16;
  const penaltyAreaSpan = height * 0.62;
  const goalAreaDepth = width * 0.06;
  const goalAreaSpan = height * 0.3;
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
      <Line points={[centerX, height * 0.03, centerX, height * 0.97]} stroke={LINE_COLOR} strokeWidth={LINE_WIDTH} />
      <Circle x={centerX} y={centerY} radius={centerCircleR} stroke={LINE_COLOR} strokeWidth={LINE_WIDTH} />
      <Circle x={centerX} y={centerY} radius={3} fill={LINE_COLOR} />

      {/* Left penalty & goal area */}
      <Rect
        x={width * 0.03}
        y={centerY - penaltyAreaSpan / 2}
        width={penaltyAreaDepth}
        height={penaltyAreaSpan}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={width * 0.03}
        y={centerY - goalAreaSpan / 2}
        width={goalAreaDepth}
        height={goalAreaSpan}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />

      {/* Right penalty & goal area */}
      <Rect
        x={width * 0.97 - penaltyAreaDepth}
        y={centerY - penaltyAreaSpan / 2}
        width={penaltyAreaDepth}
        height={penaltyAreaSpan}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={width * 0.97 - goalAreaDepth}
        y={centerY - goalAreaSpan / 2}
        width={goalAreaDepth}
        height={goalAreaSpan}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
    </>
  );
}
