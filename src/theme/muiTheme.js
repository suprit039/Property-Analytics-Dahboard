import { createTheme } from "@mui/material/styles";

const sharedTypography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h5: { fontWeight: 700 },
  h6: { fontWeight: 600 },
};

const sharedComponents = {
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        borderRadius: 12,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: "none",
        fontWeight: 600,
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#161516", light: "#616363", dark: "#000000" },
    secondary: { main: "#2FA084" },
    error: { main: "#C3232A" },
    warning: { main: "#E58C00" },
    info: { main: "#6FCF97" },
    success: { main: "#2FA084" },
    background: { default: "#EEEEEE", paper: "#FFFFFF" },
    text: { primary: "#161516", secondary: "#616363", disabled: "#AEAEB1" },
    divider: "#E0E0E0",
  },
  typography: sharedTypography,
  shape: { borderRadius: 12 },
  components: sharedComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#E8E8E8", light: "#A0A0A0", dark: "#FFFFFF" },
    secondary: { main: "#35C78A" },
    error: { main: "#E85050" },
    warning: { main: "#F5A623" },
    info: { main: "#6FCF97" },
    success: { main: "#35C78A" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#E8E8E8", secondary: "#A0A0A0", disabled: "#555555" },
    divider: "#333333",
  },
  typography: sharedTypography,
  shape: { borderRadius: 12 },
  components: sharedComponents,
});
