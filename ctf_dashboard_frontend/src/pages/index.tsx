import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useChallengeStore } from "../zustand/apis/Challenge";
import { ChallengePage } from "./ChallengePage";
import { StartChallenge } from "./StartChallenge";
import { ChallengeNumberEnum } from "../apis/enums";
import { CompleteChallenge } from "./CompleteChallenge";
import { AuthContext } from "../context/AuthContext";
import { SignInPage } from "./SignInPage";

export const MainPage: React.FC = () => {
  const {
    currentChallenge,
    currentChallengeInfo,
    getChallenge,
    getCurrentChallenge,
    isStarted,
    setIsStarted,
    resetChallenge,
  } = useChallengeStore();

  const { auth } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (auth.token) {
      getCurrentChallenge();
    }
  }, [auth.token]);

  React.useEffect(() => {
    getChallenge(currentChallenge);
  }, [currentChallenge]);

  const currentChallengeComponent = React.useCallback(() => {
    // Show challenge page if current challenge is not NONE or END, or Challenge 1
    const isChallenge =
      currentChallenge !== ChallengeNumberEnum.NONE &&
      currentChallenge !== ChallengeNumberEnum.END;

    if (isChallenge && isStarted) {
      return <ChallengePage challengeInfo={currentChallengeInfo} />;
    } else if (
      (isChallenge && !isStarted) ||
      currentChallenge === ChallengeNumberEnum.NONE
    ) {
      return (
        <StartChallenge
          onStartChallenge={() => {
            setIsStarted(true);
          }}
        />
      );
    } else if (currentChallenge === ChallengeNumberEnum.END) {
      return <CompleteChallenge />;
    }
  }, [currentChallenge, isStarted, currentChallengeInfo]);

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
