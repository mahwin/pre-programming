import { useState, useCallback } from "react";

import type { AppProps } from "next/app";

import GlobalStyle from "../styles/global-styles";
import theme, { lightTheme, darkTheme } from "../styles/theme";
import { getMediaTheme } from "@utils/getMediaTheme";

import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "@redux/store";

import { ThemeButton } from "@components/Commons/ThemeButton";

import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  const [isDark, setTheme] = useState<boolean>(getMediaTheme());

  const toggleTheme = useCallback(() => {
    setTheme((prev) => !prev);
  }, []);

  return (
    <>
      <Head>
        <title>Pre-Programming</title>
      </Head>

      <Provider store={store}>
        <ThemeProvider
          theme={{
            ...theme,
            colorTheme: isDark ? darkTheme : lightTheme,
          }}
        >
          <GlobalStyle />
          <ThemeButton onClick={toggleTheme} isDark={isDark} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
