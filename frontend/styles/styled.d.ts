import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    windowSize: {
      mobile: string;
      tablet: string;
      pc: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
    };
    colorTheme: {
      background: string;
      fontPrimary: string;
      fontSecondary: string;
      primary: string;
      secondary: string;
      hover: string;
    };
  }
}
