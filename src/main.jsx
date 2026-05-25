import "./index.css";
import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./app/store";
import { lightTheme, darkTheme } from "./theme/muiTheme";
import { ThemeModeProvider, useThemeMode } from "./hooks/useThemeMode";
import App from "./App.jsx";

function ThemedApp() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeModeProvider>
        <ThemedApp />
      </ThemeModeProvider>
    </Provider>
  </StrictMode>
);
