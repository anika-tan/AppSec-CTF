import React from "react";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { ChallengeNumberEnum, ChallengeProgressEnum } from "../../apis/enums";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import * as styles from "./style.scss";

export const StartChallenge: React.FC = () => {
  const { setCurrentChallenge, setCurrentChallengeProgress } =
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
        Welcome to the challenge!
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
        Start Challenge
        <KeyboardArrowLeftIcon
          sx={{ fontSize: "inherit" }}
          className={styles.leftArrow}
        />
      </Button>
      <Typography
        variant="h5"
        sx={{
          color: "var(--secondary-font-color)",
        }}
      >
        No turning back!
      </Typography>
    </Box>
  );
};
