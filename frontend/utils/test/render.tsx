import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import theme, { lightTheme, darkTheme } from "../../styles/theme";
import { ReactElement } from "react";

export default async (component: ReactElement) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(
      <ThemeProvider theme={{ ...theme, colorTheme: lightTheme }}>
        {component}
      </ThemeProvider>
    ),
  };
};
