import Icon from "./Icon";
import styled from "styled-components";

const Svg = styled(Icon)`
  padding: 3px;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  path {
    stroke: ${(props) => props.color};
  }
`;

interface Iprops {
  width?: string;
  height?: string;
  color?: string;
}

export const MagnifyingGlassSvg = ({ width, height, color }: Iprops) => {
  return (
    <Svg fill="none" width={width} height={height} color={color}>
      <path
        strokeWidth="3px"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </Svg>
  );
};
