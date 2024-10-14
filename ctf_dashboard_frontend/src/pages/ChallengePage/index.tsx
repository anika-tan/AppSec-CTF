import { Box, Button, Link, Typography } from "@mui/material";
import React from "react";
import { Header } from "../../components/Header";

import * as styles from "../style.scss";
import { HintDialog } from "../../components/HintDialog";
import { SubmissionDialog } from "../../components/SubmissionDialog";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { ChallengeNumberEnum, ChallengeProgressEnum } from "../../apis/enums";
import { FailDialog } from "../../components/FailDialog";
import { SuccessDialog } from "../../components/SuccessDialog";
import { ChallengeModel } from "../../apis/Challenge/typings";

interface ChallengePageProps {
  challengeInfo: ChallengeModel;
}

export const ChallengePage: React.FC<ChallengePageProps> = ({
  challengeInfo,
}) => {
  const [isHintsOpen, setIsHintsOpen] = React.useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = React.useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = React.useState(false);
  const [isFailDialogOpen, setIsFailDialogOpen] = React.useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = React.useState(false);

  const {
    currentChallenge,
    highestChallenge,
    setCurrentChallenge,
    currentChallengeProgress,
    setCurrentChallengeProgress,
    successMessage,
    submitFlag,
    getCurrentChallenge,
  } = useChallengeStore();

  React.useEffect(() => {
    if (challengeInfo.id < highestChallenge) {
      setCurrentChallengeProgress(ChallengeProgressEnum.COMPLETED);
    } else {
      setCurrentChallengeProgress(ChallengeProgressEnum.NOT_STARTED);
    }
  }, [challengeInfo]);

  const handleNextChallenge = () => {
    setIsSuccessDialogOpen(false);
    getCurrentChallenge();
  };

  const handleSubmission = async (flag: string) => {
    setIsSubmissionLoading(true);
    const isFlagCorrect = await submitFlag(
      challengeInfo.id as unknown as ChallengeNumberEnum,
      flag
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
          title={challengeInfo.title}
          onHintClick={() => {
            setIsHintsOpen(true);
          }}
        />
        <div className={styles.challengeContent}>
          <Typography variant="h5">{challengeInfo.description}</Typography>
          <Typography variant="h5">Click here</Typography>
          <Link href={challengeInfo.link} target="_blank">
            <Typography variant="h5">{challengeInfo.link}</Typography>
          </Link>
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
        hints={challengeInfo.hints}
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
        description={successMessage}
        onConfirm={handleNextChallenge}
        onCancel={() => {
          setIsSuccessDialogOpen(false);
        }}
      />
      <FailDialog open={isFailDialogOpen} onCancel={handleFailDialogClose} />
    </>
  );
};
