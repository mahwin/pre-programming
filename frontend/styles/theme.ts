import { DefaultTheme } from "styled-components";

const windowSize = {
  mobile: "600px",
  tablet: "768px",
  pc: "1024px",
};

const fontSize = {
  xs: "0.5rem",
  sm: "0.75rem",
  base: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
  xlg: "3rem",
  xxlg: "5rem",
};

const fontWeight = {
  xs: "200",
  base: "400",
  bold: "500",
  xbold: "700",
  xxbold: "900",
};

export const lightTheme = {
  backgroundColor: "#dfe6e9",
  textPrimary: "#2d3436",
  textSecondary: "#b2bec3",
  textThird: "#2d3436",
  inputPrimary: "#E0ECE4",
  buttonPrimary: "#004445",
  buttonSecondary: "#E0ECE4",
  hoverPrimary: "#218c74",
  activePrimary: "#00b894",
};
// 1.색상은 나중에 선택
export const darkTheme = {
  backgroundColor: "#2d3436",
  textPrimary: "#dfe6e9",
  textSecondary: "#636e72",
  textThird: "#2d3436",
  inputPrimary: "#E0ECE4",
  buttonPrimary: "#004445",
  buttonSecondary: "#E0ECE4",
  hoverPrimary: "#218c74",
  activePrimary: "#55efc4",
};

const theme: DefaultTheme = {
  windowSize,
  fontSize,
  fontWeight,
  colorTheme: { ...lightTheme },
};

export default theme;
