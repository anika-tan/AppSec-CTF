import React from "react";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { Box, Button, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import * as styles from "../StartChallenge/style.scss";
import { ChallengeNumberEnum, ChallengeProgressEnum } from "../../apis/enums";

export const CompleteChallenge: React.FC = () => {
  const { resetChallenge, setCurrentChallenge, setCurrentChallengeProgress } =
    useChallengeStore();
  return (
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