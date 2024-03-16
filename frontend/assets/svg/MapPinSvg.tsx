import { Icon } from "./Icon";
import styled from "styled-components";

const Svg = styled(Icon)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  path {
    stroke: ${(props) => props.theme.colorTheme.hoverPrimary};
  }
`;

interface Iprops {
  width?: string;
  height?: string;
}

export const MapPinSvg = ({ width, height }: Iprops) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      width={width}
      height={height}
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </Svg>
  );
};
