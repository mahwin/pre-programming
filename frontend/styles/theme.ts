import { DefaultTheme } from "styled-components";

const windowSize = {
  mobile: 'screen and (max-width: "600px")',
  tablet: 'screen and (max-width: "768px")',
  pc: 'screen and (max-width: "024px")',
};

const fontSize = {
  xs: "0.5rem",
  sm: "0.75rem",
  base: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
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
  colorTheme: { ...lightTheme },
};

export default theme;
