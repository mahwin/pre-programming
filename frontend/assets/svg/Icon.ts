import styled from "styled-components";

interface SvgProps {
  width?: string;
  height?: string;
  color?: string;
  fill: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const SvgWithAttrs = styled.svg.attrs({
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  viewBox: "0 0 24 24",
})``;

export const Icon = styled(SvgWithAttrs)<SvgProps>``;
