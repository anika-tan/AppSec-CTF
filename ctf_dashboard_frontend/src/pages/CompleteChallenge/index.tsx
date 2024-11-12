import React from "react";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { Box, Button, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import * as styles from "../StartChallenge/style.scss";
import { ChallengeNumberEnum, ChallengeProgressEnum } from "../../apis/enums";
import { CompleteChallengeData } from "./utils"; // le story
import StoryDisplay from "./StoryDisplay";

export const CompleteChallenge: React.FC = () => {
  const { resetChallenge, setCurrentChallenge, setCurrentChallengeProgress } =
    useChallengeStore();

  const [isCredits, setIsCredits] = React.useState(true);

  return isCredits ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(100% - 2rem)",
        justifyContent: "center",
        paddingBottom: "2rem",
        gap: "1rem",
      }}
    >
      {/* Skip button, position at top right */}
      <Button
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          fontSize: "1.5rem",
          padding: "0.5rem 1rem",
        }}
        onClick={() => {
          setIsCredits(false);
        }}
      >
        Skip
      </Button>

      {/* Slowly show each content here, with each block only showing its duration, and each line appearing after its duration */}
      <StoryDisplay
        currentStory={CompleteChallengeData}
        onEnd={() => {
          setIsCredits(false);
        }}
      />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(100% - 2rem)",
        justifyContent: "center",
        paddingBottom: "2rem",
        gap: "1rem",
      }}
    >
      <Typography variant="h4" sx={{ color: "var(--secondary-font-color)" }}>
        Congratulations! You have completed all the challenges!
      </Typography>
      <Button
        sx={{
          fontSize: "2rem",
          padding: "0.5rem 1rem",
        }}
        onClick={() => {
          resetChallenge();
          setCurrentChallenge(ChallengeNumberEnum.Challenge1);
          setCurrentChallengeProgress(ChallengeProgressEnum.NOT_STARTED);
        }}
        className={styles.startChallengeButton}
      >
        <KeyboardArrowRightIcon
          sx={{ fontSize: "inherit" }}
          className={styles.rightArrow}
        />
        Try Again?
        <KeyboardArrowLeftIcon
          sx={{ fontSize: "inherit" }}
          className={styles.leftArrow}
        />
      </Button>
      <Typography
        onClick={() => {
          resetChallenge();
        }}
        variant="h5"
        sx={{
          cursor: "pointer",
          color: "var(--secondary-font-color)",
          userSelect: "none",
        }}
      >
        Go back home
      </Typography>
    </Box>
  );
};
