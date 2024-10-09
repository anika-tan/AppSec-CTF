import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#20c20e",
    },
    secondary: {
      main: "#c7c6c6",
    },
    background: {
      default: "#1b1b1b",
      paper: "#1b1b1b",
    },
  },
  typography: {
    fontFamily: `"Pixelify Sans", "Roboto", sans-serif`,
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "var(--primary-font-color)",
    },
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
            // sx: {
            //   opacity: "0.8 !important",
            // },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--primary-background-color)",
          color: "var(--primary-font-color)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
          color: "var(--primary-font-color)",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
          color: "var(--primary-font-color)",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
          color: "var(--secondary-font-color)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1.4rem",
          color: "var(--primary-font-color)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
          color: "var(--primary-font-color)",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
