import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Header } from "../../components/Header";

import * as styles from "../style.scss";
import { HintDialog } from "../../components/HintDialog";
import { SubmissionDialog } from "../../components/SubmissionDialog";

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
            The content of the challenge is here mkay?
          </Typography>
        </div>
        <Button
          sx={{ alignSelf: "flex-end" }}
          onClick={() => {
            setIsSubmissionOpen(true);
          }}
        >
          Submit
        </Button>
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
        onSubmit={() => {
          console.log("submitting flag");
        }}
        onCancel={() => {
          setIsSubmissionOpen(false);
        }}
      />
    </>
  );
};
