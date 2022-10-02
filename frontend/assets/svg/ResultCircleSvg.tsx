import styled, { keyframes } from "styled-components";

export function ResultCircleSvg({ percent }: { percent: string }) {
  const clockAnimation = keyframes`
  0%{
		stroke-dashoffset: 0;
	}
	100%{
		stroke-dashoffset: ${+percent * 7.2};    
	}`;

  const Circle = styled.circle`
    transform-origin: center;
    animation: ${clockAnimation} 3s linear forwards;
  `;

  return (
    <svg height="300" width="300">
      <circle
        cx="150"
        cy="150"
        r="120"
        stroke="#ab4e6b"
        strokeWidth="20"
        fill="none"
      ></circle>
      <Circle
        cx="150"
        cy="150"
        r="120"
        stroke="#968089"
        strokeWidth="20"
        // strokeDasharray="183.35999999999999,764"
        strokeDasharray="760"
        fill="none"
      ></Circle>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        stroke="none"
        strokeWidth="1px"
        dy=".3em"
        fontSize={20}
        fontWeight={600}
      >
        <tspan x="50%" dy="0em">
          {percent}%
        </tspan>
        <tspan x="50%" dy="1.9em">
          Your Score
        </tspan>
      </text>
    </svg>
  );
}
