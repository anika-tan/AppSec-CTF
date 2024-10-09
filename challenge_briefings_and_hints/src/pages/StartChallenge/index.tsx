import React from "react";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { Box, Button } from "@mui/material";
import { ChallengeNumberEnum, ChallengeProgressEnum } from "../../apis/enums";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const StartChallenge: React.FC = () => {
  const { setCurrentChallenge, setCurrentChallengeProgress } =
    useChallengeStore();
  return (
    <Box>
      <Button
        sx={{
          fontSize: "2rem",
        }}
        onClick={() => {
          setCurrentChallenge(ChallengeNumberEnum.Challenge1);
          setCurrentChallengeProgress(ChallengeProgressEnum.NOT_STARTED);
        }}
      >
        <KeyboardArrowRightIcon sx={{ fontSize: "inherit" }} />
        Start Challenge
        <KeyboardArrowLeftIcon sx={{ fontSize: "inherit" }} />
      </Button>
    </Box>
  );
};
