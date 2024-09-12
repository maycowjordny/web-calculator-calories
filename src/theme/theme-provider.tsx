"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function CalculateCaloriesThemeProvider({ children }: Props) {
  const themeSettings = createTheme({
    palette: {
      background: {
        default: "#f4f6f8",
        paper: "#ffffff",
      },
      primary: {
        light: "#4f9a94",
        main: "#00796b",
        dark: "#004c40",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#ffcccb",
        main: "#ff5252",
        dark: "#b33939",
        contrastText: "#ffffff",
      },
      text: {
        primary: "#333333",
        secondary: "#555555",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#004c40",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#00796b",
            color: "#ffffff",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            padding: "16px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });

  const theme = createTheme(themeSettings as ThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
