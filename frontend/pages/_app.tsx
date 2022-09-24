import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global-styles";
import theme, { lightTheme, darkTheme } from "../styles/theme";
import { Provider } from "react-redux";
import store from "../redux/store";

function App({ Component, pageProps }: AppProps) {
  console.log(`${store.getState().isDark}`);
  return (
    <Provider store={store}>
      <ThemeProvider
        theme={{
          ...theme,
          colorTheme: store.getState().isDark ? darkTheme : lightTheme,
        }}
      >
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
