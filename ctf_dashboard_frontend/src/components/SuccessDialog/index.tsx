import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface SuccessDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  title = "Fantastic! You did it!",
  description, // Success message depend on the challenge
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "var(--secondary-font-color)" }}
          onClick={onCancel}
        >
          Okay
        </Button>
        <Button sx={{ color: "var(--primary-font-color)" }} onClick={onConfirm}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};
