import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global-styles";
import theme, { lightTheme, darkTheme } from "../styles/theme";
import { Provider, useDispatch } from "react-redux";
import { useState } from "react";
import store from "../redux/store";
import ThemeButton from "../components/ThemeButton";

function App({ Component, pageProps }: AppProps) {
  const [isDark, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };
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
