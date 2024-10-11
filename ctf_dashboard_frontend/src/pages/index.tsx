import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useChallengeStore } from "../zustand/apis/Challenge";
import { Challenge1 } from "./Challenge1";
import { StartChallenge } from "./StartChallenge";
import { ChallengeNumberEnum } from "../apis/enums";
import * as styles from "./style.scss";
import { Challenge2 } from "./Challenge2";
import { CompleteChallenge } from "./CompleteChallenge";
import { AuthContext } from "../context/AuthContext";
import { SignInPage } from "./SignInPage";

// Map currentChallenge to component
const challengeMap = new Map([
  [ChallengeNumberEnum.NONE, StartChallenge],
  [ChallengeNumberEnum.Challenge1, Challenge1],
  [ChallengeNumberEnum.Challenge2, Challenge2],
  [ChallengeNumberEnum.END, CompleteChallenge],
]);

export const MainPage: React.FC = () => {
  const {
    currentChallenge,
    currentChallengeProgress,
    setCurrentChallenge,
    setCurrentChallengeProgress,
    submitFlag,
    userInfo,
  } = useChallengeStore();

  const { auth } = React.useContext(AuthContext);

  const currentChallengeComponent = React.useCallback(() => {
    const Component = challengeMap.get(currentChallenge);
    return Component ? <Component /> : null;
  }, [currentChallenge]);

  return (
    <>
      {auth.user ? (
        currentChallengeComponent()
      ) : auth.token ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <SignInPage />
      )}
    </>
  );
};
