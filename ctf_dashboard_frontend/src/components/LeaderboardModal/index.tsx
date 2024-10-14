import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useChallengeStore } from "../../zustand/apis/Challenge";

interface LeaderboardDialogProps {
  open: boolean;
  onCancel: () => void;
}

export const LeaderboardDialog: React.FC<LeaderboardDialogProps> = ({
  open,
  onCancel,
}) => {
  const { leaderboard, getLeaderboard } = useChallengeStore();
  React.useEffect(() => {
    getLeaderboard();
  }, [open]);

  const leaderboardList = React.useMemo(() => {
    const list = leaderboard.map((item) => (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            color: "var(--secondary-font-color)",
            userSelect: "none",
          }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "var(--secondary-font-color)",
            userSelect: "none",
          }}
        >
          {item.completed_users}
        </Typography>
      </Box>
    ));
    list.unshift(
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            color: "var(--primary-font-color)",
            userSelect: "none",
          }}
        >
          {"Title"}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "var(--primary-font-color)",
            userSelect: "none",
          }}
        >
          {"Completed Users"}
        </Typography>
      </Box>
    );
    return list;
  }, [leaderboard]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{"Leaderboard"}</DialogTitle>
      <DialogContent>{leaderboardList}</DialogContent>
    </Dialog>
  );
};
