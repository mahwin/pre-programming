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
  background: "#fff",
  fontPrimary: "black",
  fontSecondary: "gray",
  primary: "#00a0ff",
  secondary: "#ddd",
  hover: "#00a0ff50",
};
// 1.색상은 나중에 선택
export const darkTheme = {
  background: "#fff",
  fontPrimary: "black",
  fontSecondary: "gray",
  primary: "#00a0ff",
  secondary: "#ddd",
  hover: "#00a0ff50",
};

const theme: DefaultTheme = {
  windowSize,
  fontSize,
  fontWeight,
  colorTheme: { ...lightTheme },
};

export default theme;
