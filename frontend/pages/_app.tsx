import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global-styles";
import theme, { lightTheme, darkTheme } from "../styles/theme";
import { Provider } from "react-redux";
import { useState } from "react";
import store from "../redux/store";
import ThemeButton from "../components/ThemeButton";
import { SWRConfig } from "swr";

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
        <SWRConfig
          value={{
            fetcher: (url: string) =>
              fetch(url).then((response) => response.json()),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
