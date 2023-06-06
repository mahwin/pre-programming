import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global-styles";
import theme, { lightTheme, darkTheme } from "../styles/theme";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import LocalStorage from "@utils/localStorage";
import { useState } from "react";
import Head from "next/head";
import { getMediaTheme } from "@utils/getMedia";
import ThemeButton from "@components/Commons/ThemeButton";

function App({ Component, pageProps }: AppProps) {
  const token = LocalStorage.getItem("accessToken");
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const [isDark, setTheme] = useState<boolean>(getMediaTheme());

  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Pre-Programming</title>
        <link rel="shortcut icon" href="/favicon1.ico" />
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
