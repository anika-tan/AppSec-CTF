import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface SubmissionDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  onSubmit: () => void;
  onCancel: () => void;
}

export const SubmissionDialog: React.FC<SubmissionDialogProps> = ({
  open,
  title = "Submission",
  description = "Submit your answer",
  content,
  onSubmit,
  onCancel,
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
        <Button sx={{ color: "var(--warning-font-color)" }} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          sx={{ color: "var(--secondary-font-color)" }}
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
