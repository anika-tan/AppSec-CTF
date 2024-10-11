import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

interface SubmissionDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SubmissionDialog: React.FC<SubmissionDialogProps> = ({
  open,
  title = "Submission",
  description = "Submit your answer",
  content,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {content}
      </DialogContent>
      <DialogActions>
        {" "}
        <Button
          sx={{ color: "var(--warning-font-color)" }}
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          sx={{ color: "var(--secondary-font-color)" }}
          onClick={onSubmit}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={16} />}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
