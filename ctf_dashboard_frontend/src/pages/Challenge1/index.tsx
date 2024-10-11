import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Header } from "../../components/Header";

import * as styles from "../style.scss";
import { HintDialog } from "../../components/HintDialog";
import { SubmissionDialog } from "../../components/SubmissionDialog";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { ChallengeNumberEnum, ChallengeProgressEnum } from "../../apis/enums";
import { FailDialog } from "../../components/FailDialog";
import { SuccessDialog } from "../../components/SuccessDialog";

const hints: string[] = [
  "Hint 1: I'm tired so I'm not going to tell you",
  "Hint 2: I'm still tired so I'm not going to tell you",
  "Hint 3: why are you still here?",
  "Hint 4: I'm not going to tell you! GO AWAY!",
  "Hint 5: Wow, you're really persistent, aren't you?",
  "Hint 6: FINE! Here's a hint: the flag is ****************",
];

export const Challenge1: React.FC = () => {
  const [isHintsOpen, setIsHintsOpen] = React.useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = React.useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = React.useState(false);
  const [isFailDialogOpen, setIsFailDialogOpen] = React.useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = React.useState(false);

  const { setCurrentChallenge, currentChallengeProgress, submitFlag } =
    useChallengeStore();

  React.useEffect(() => {
    if (currentChallengeProgress === ChallengeProgressEnum.COMPLETED) {
      setIsSuccessDialogOpen(true);
    }
  }, [currentChallengeProgress]);

  const handleNextChallenge = () => {
    setCurrentChallenge(ChallengeNumberEnum.Challenge2);
  };

  const handleSubmission = async () => {
    setIsSubmissionLoading(true);
    const isFlagCorrect = await submitFlag(
      ChallengeNumberEnum.Challenge1,
      "flag"
    );
    setIsSubmissionLoading(false);

    if (!isFlagCorrect) {
      setIsSubmissionOpen(false);
      setIsFailDialogOpen(true);
    } else if (isFlagCorrect) {
      setIsSubmissionOpen(false);
      setIsSuccessDialogOpen(true);
    }
  };

  const handleFailDialogClose = () => {
    setIsFailDialogOpen(false);
  };

  return (
    <>
      <div className={styles.challengeContainer}>
        <Header
          title="Challenge 1 - Sneaky Sneak"
          onHintClick={() => {
            setIsHintsOpen(true);
          }}
        />
        <div className={styles.challengeContent}>
          <Typography variant="h5">
            The content of Challenge 1 will be here
          </Typography>
        </div>
        {currentChallengeProgress !== ChallengeProgressEnum.COMPLETED ? (
          <Button
            sx={{ alignSelf: "flex-end" }}
            onClick={() => {
              setIsSubmissionOpen(true);
            }}
            disabled={isSubmissionLoading}
          >
            Submit
          </Button>
        ) : (
          <Button sx={{ alignSelf: "flex-end" }} onClick={handleNextChallenge}>
            Next Challenge
          </Button>
        )}
      </div>
      <HintDialog
        open={isHintsOpen}
        hints={hints}
        title="Hints"
        onCancel={() => {
          setIsHintsOpen(false);
        }}
      />
      <SubmissionDialog
        open={isSubmissionOpen}
        title="Submission"
        description="Submit your answer"
        onSubmit={handleSubmission}
        onCancel={() => {
          setIsSubmissionOpen(false);
        }}
        isLoading={isSubmissionLoading}
      />
      <SuccessDialog
        open={isSuccessDialogOpen}
        onConfirm={handleNextChallenge}
        onCancel={() => {
          setIsSuccessDialogOpen(false);
        }}
      />
      <FailDialog open={isFailDialogOpen} onCancel={handleFailDialogClose} />
    </>
  );
};
