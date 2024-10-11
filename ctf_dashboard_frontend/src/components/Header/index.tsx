import React from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";

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
            <Tooltip title="Hint">
              <IconButton onClick={onHintClick}>
                <LightbulbIcon />
              </IconButton>
            </Tooltip>
          )}
          {onResetProgressClick && (
            <Tooltip title="Reset Progress">
              <IconButton onClick={onResetProgressClick}>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
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
