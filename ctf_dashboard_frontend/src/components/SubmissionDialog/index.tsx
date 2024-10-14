import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

interface SubmissionDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  onSubmit: (flag: string) => void;
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
  const [flag, setFlag] = React.useState("");

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {content}
        <TextField
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="Flag"
          fullWidth
          required
          sx={{
            backgroundColor: "var(--secondary-font-color)",
            color: "var(--primary-font-color)",
            borderRadius: "5px",
          }}
          disabled={isLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "var(--warning-font-color)" }}
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          sx={{ color: "var(--secondary-font-color)" }}
          onClick={() => {
            onSubmit(flag);
            setFlag("");
          }}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={16} />}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
