import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global-styles";
import theme, { lightTheme, darkTheme } from "../styles/theme";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDrak] = useState(false);
  useEffect(() => {
    setIsDrak(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  return (
    <ThemeProvider
      theme={{
        ...theme,
        colorTheme: isDark ? darkTheme : lightTheme,
      }}
    >
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
