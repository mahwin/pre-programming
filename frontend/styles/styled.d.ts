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
      xlg: string;
      xxlg: string;
    };
    fontWeight: {
      xs: string;
      base: string;
      bold: string;
      xbold: string;
      xxbold: string;
    };
    colorTheme: {
      backgroundColor: string;
      textPrimary: string;
      textSecondary: string;
      textThird: string;
      inputPrimary: string;
      buttonPrimary: string;
      buttonSecondary: string;
      hoverPrimary: string;
      activePrimary: string;
    };
  }
}
