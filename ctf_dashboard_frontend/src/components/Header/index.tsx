import React from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LogoutIcon from "@mui/icons-material/Logout";

import * as styles from "./style.scss";
import { useChallengeStore } from "../../zustand/apis/Challenge";
import { ConfirmDialog } from "../ConfirmDialog";
import { AuthContext } from "../../context/AuthContext";

interface HeaderProps {
  title: string;
  onHintClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onHintClick }) => {
  const { resetChallenge } = useChallengeStore();
  const { logout } = React.useContext(AuthContext);

  const [isResetDialogOpen, setIsResetDialogOpen] = React.useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);

  const onResetProgressClick = () => {
    setIsResetDialogOpen(true);
  };

  const onLogoutClick = () => {
    setIsLogoutDialogOpen(true);
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
          <IconButton onClick={onLogoutClick}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <ConfirmDialog
        open={isResetDialogOpen}
        title="Reset Challenge"
        description="This action cannot be undone"
        onConfirm={resetChallenge}
        onCancel={() => setIsResetDialogOpen(false)}
      />
      <ConfirmDialog
        open={isLogoutDialogOpen}
        title="Logout"
        description="Are you sure you want to logout?"
        onConfirm={logout}
        onCancel={() => setIsLogoutDialogOpen(false)}
      />
    </>
  );
};
