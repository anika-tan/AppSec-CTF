import React from "react";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { Box, Button, Typography } from "@mui/material";
import { ChallengeNumberEnum, ChallengeProgressEnum } from "../../apis/enums";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import * as styles from "./style.scss";

const splashTexts = [
  "Are you ready? Of course you are!",
  "Good luck! You need it :-)",
  "Not for CHICKENS!",
  "Think you can handle this? We'll see!",
  "Brace yourself, it's about to get real!",
  "Don't worry, it's only a *little* hard!",
  "If you fail, at least you tried… right?",
  "Remember, quitting is for quitters.",
  "Warning: May cause overconfidence!",
  "Pro tip: Don't rage quit... or do, it's your call",
  "No one will judge you if you fail",
  "This will blow your pants off!",
  "10/10 will recommend - IGN (not really)",
  "Eww, who's that ugly gu- Oh wait, that's you...",
  "<insert motivational quote here>",
  "01100010 01110010 01110101 01101000",
];

export const StartChallenge: React.FC = () => {
  const { setCurrentChallenge, setCurrentChallengeProgress } =
    useChallengeStore();

  const [splashText, setSplashText] = React.useState<string>(
    splashTexts[Math.floor(Math.random() * splashTexts.length)]
  );
  const onSplashTextClick = () => {
    let newSplashText = splashText;
    do {
      const randomIndex = Math.floor(Math.random() * splashTexts.length);
      newSplashText = splashTexts[randomIndex];
    } while (newSplashText === splashText);
    setSplashText(newSplashText);
  };

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
        onClick={onSplashTextClick}
        variant="h5"
        sx={{
          cursor: "default",
          color: "var(--secondary-font-color)",
          userSelect: "none",
        }}
      >
        {splashText}
      </Typography>
    </Box>
  );
};