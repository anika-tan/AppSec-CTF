import React from "react";
import { IconButton, Typography } from "@mui/material";

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import * as styles from "./style.scss";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { ConfirmDialog } from "../ConfirmDialog";

interface HeaderProps {
  title: string;
  onHintClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onHintClick }) => {
  const { resetChallenge } = useChallengeStore();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const onResetProgressClick = () => {
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <Typography variant="h1">{title}</Typography>
        <div className={styles.buttonContainer}>
          {onHintClick && (
            <IconButton onClick={onHintClick}>
              <LightbulbIcon />
            </IconButton>
          )}
          {onResetProgressClick && (
            <IconButton onClick={onResetProgressClick}>
              <RestartAltIcon />
            </IconButton>
          )}
        </div>
      </div>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Reset Challenge"
        description="This action cannot be undone"
        onConfirm={resetChallenge}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
};
