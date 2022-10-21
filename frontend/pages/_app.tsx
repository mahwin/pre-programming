import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global-styles";
import theme, { lightTheme, darkTheme } from "../styles/theme";
import { Provider } from "react-redux";
import { useState } from "react";
import wrapper from "../redux/store";
import ThemeButton from "@components/Commons/ThemeButton";
import axios from "axios";
import LocalStorage from "@utils/localStorage";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
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
