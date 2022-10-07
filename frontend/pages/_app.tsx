import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global-styles";
import theme, { lightTheme, darkTheme } from "../styles/theme";
import { Provider } from "react-redux";
import { useState } from "react";
import store from "../redux/store";
import ThemeButton from "../components/ThemeButton";
import axios from "axios";
import LocalStorage from "../libs/localStorage";

function App({ Component, pageProps }: AppProps) {
  const [isDark, setTheme] = useState(true);
  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };
  const token = LocalStorage.getItem("accessToken");
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return (
    <Provider store={store}>
      <ThemeButton onClick={toggleTheme} isDark={isDark} />
      <ThemeProvider
        theme={{
          ...theme,
          colorTheme: isDark ? darkTheme : lightTheme,
        }}
      >
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
