import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  Icon,
  InputAdornment,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import MuiCard from "@mui/material/Card";

import { ForgotPassword } from "./ForgotPassword";
import { useAuthStore } from "../../zustand/apis/Auth";
import { AuthContext } from "../../context/AuthContext";
import { validatePassword } from "../../utils";

// Huge thanks to https://github.com/mui/material-ui/blob/v6.1.1/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  width: "100%",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export const SignInPage: React.FC = () => {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [isSignUp, setIsSignUp] = React.useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = React.useState(false);

  const { login, register } = useAuthStore();
  const { login: authLoginHandler } = React.useContext(AuthContext);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleForgotPasswordOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === document.activeElement) {
      setOpen(true);
    }
  };

  const handleForgotPasswordClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  const validateInputs = () => {
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (isSignUp) {
      const username = document.getElementById("username") as HTMLInputElement;

      if (!username.value) {
        setUsernameError(true);
        setUsernameErrorMessage("Please enter a username.");
        isValid = false;
      } else {
        setUsernameError(false);
        setUsernameErrorMessage("");
      }
    }

    if (!validatePassword(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  // Login and register in the same function, funnt innit?
  const handleLogin = async () => {
    const password = document.getElementById("password") as HTMLInputElement;
    const username = document.getElementById("username") as HTMLInputElement;
    let loginError = false;

    if (validateInputs()) {
      if (isSignUp) {
        loginError = await register(
          username.value,
          password.value,
          authLoginHandler
        );
      } else if (!isSignUp) {
        loginError = await login(
          username.value,
          password.value,
          authLoginHandler
        );
      }

      if (!loginError) {
        setUsernameError(false);
        setUsernameErrorMessage("");

        setPasswordError(true);
        setPasswordErrorMessage("Incorrect email or password.");
      }
    }
  };

  return (
    <>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              color: "var(--secondary-font-color)",
            }}
          >
            Sign {isSignUp ? "Up" : "In"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel
                htmlFor="username"
                sx={{
                  color: "var(--secondary-font-color)",
                }}
              >
                Username
              </FormLabel>
              <TextField
                error={usernameError}
                helperText={usernameErrorMessage}
                id="username"
                type="username"
                name="username"
                placeholder="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={usernameError ? "error" : "primary"}
                sx={{
                  ariaLabel: "username",
                  backgroundColor: "var(--secondary-font-color)",
                  color: "var(--primary-font-color)",
                  borderRadius: "5px",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    document.getElementById("email")?.focus();
                  }
                }}
              />
            </FormControl>

            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel
                  htmlFor="password"
                  sx={{
                    color: "var(--secondary-font-color)",
                  }}
                >
                  Password
                </FormLabel>
                <Link
                  component="button"
                  onClick={handleForgotPasswordOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                sx={{
                  backgroundColor: "var(--secondary-font-color)",
                  color: "var(--primary-font-color)",
                  borderRadius: "5px",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </Icon>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
            <ForgotPassword
              open={open}
              handleClose={handleForgotPasswordClose}
            />

            <Typography
              sx={{ color: "var(--secondary-font-color)" }}
              variant="h6"
            >
              By clicking Continue, you agree to our{" "}
              <Typography
                sx={{
                  color: "var(--primary-font-color)",
                  display: "inline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsTermsDialogOpen(true);
                }}
              >
                Terms and Services
              </Typography>
            </Typography>

            <Button
              id="submit-button"
              type="submit"
              fullWidth
              // variant="contained"
            >
              {isSignUp ? "Register" : "Continue"}
            </Button>
            <Typography
              sx={{ textAlign: "center", color: "var(--secondary-font-color)" }}
            >
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  onClick={() => setIsSignUp(!isSignUp)}
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign {isSignUp ? "In" : "Up"}
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
      <Dialog
        open={isTermsDialogOpen}
        onClose={() => setIsTermsDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Terms and Services</DialogTitle>
        <DialogContent>
          <DialogContentText>
            1. Password cannot be changed, if you forget your password, you will
            have to create a new account. User accounts cannot be deleted. We
            are not responsible for any lost accounts. We are not responsible
            for anything at all.
          </DialogContentText>
          <DialogContentText>
            2. We are not responsible for any damages caused by the use of this,
            this includes reputational damage, loss of brain cells, and loss of
            sleep.
          </DialogContentText>
          <DialogContentText>
            3. We reserve the right to change the terms and services at any time
            without notice and displaying it right here. You are responsible for
            everything negative that happens.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
