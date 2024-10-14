import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

interface HintDialogProps {
  open: boolean;
  hints?: string[];
  title?: string;
  onCancel: () => void;
}

export const HintDialog: React.FC<HintDialogProps> = ({
  open,
  hints,
  title = "Hints",
  onCancel,
}) => {
  const [hintIndex, setHintIndex] = React.useState(0);
  const [currentHint, setCurrentHint] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (hints && hints.length > 0) {
      setCurrentHint(hints[hintIndex]);
    } else {
      setCurrentHint("Looks like there are no hints for this challenge...");
    }
  }, [hintIndex, hints]);

  const incrementHint = () => {
    if (hints && hintIndex < hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };

  const decrementHint = () => {
    if (hintIndex > 0) {
      setHintIndex(hintIndex - 1);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {currentHint ?? "Ooops looks like I can't help you with this..."}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <IconButton
          sx={{ visibility: hintIndex === 0 ? "hidden" : "visible" }}
          disabled={hintIndex === 0}
          onClick={decrementHint}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography
          variant="body2"
          sx={{
            color: "var(--secondary-font-color)",
            visibility: hints && hints.length > 0 ? "visible" : "hidden",
          }}
        >
          {hintIndex + 1} / {hints?.length ?? 1}
        </Typography>
        <IconButton
          sx={{
            visibility:
              hints && hintIndex !== hints.length - 1 ? "visible" : "hidden",
          }}
          disabled={hints && hintIndex === hints.length}
          onClick={incrementHint}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
