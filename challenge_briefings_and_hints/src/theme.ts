import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1b1b1b",
    },
    secondary: {
      main: "#0065d5",
    },
    background: {
      default: "#f5f5f5",
      paper: "#dbdeea",
    },
  },
  typography: {
    fontFamily: `"Pixelify Sans", "Roboto", sans-serif`,
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.4rem",
      fontWeight: 600,
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "0.9rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      defaultProps: {
        slotProps: {
          backdrop: {
            sx: {
              opacity: "0.8 !important",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "var(--primary-font-color)",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
