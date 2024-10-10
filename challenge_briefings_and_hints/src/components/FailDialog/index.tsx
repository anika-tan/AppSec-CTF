import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface FailDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
}

const insults = [
  "I think you're missing the point, and by point, I mean the flag.",
  "It's okay, everyone makes mistakes. Yours is not getting the flag.",
  "Are you even trying? The flag is right there.",
  "Maybe you should try again. And again. And again.",
  "Even my grandma could solve this. And she's dead.",
  "Oh hey, you're back! Still no flag, huh?",
  "You know what a flag is, right? It's not a unicorn.",
  "For the love of all that is holy, just get the flag.",
  "Maybe you should try a different challenge. This one's too hard for you.",
  "I'm starting to think you're not cut out for this.",
  "Yes, you're wrong. No, I won't tell you why.",
  "<insert witty insult here>",
];

export const FailDialog: React.FC<FailDialogProps> = ({
  open,
  title = "That's not right >-<",
  description,
  onCancel,
}) => {
  const [insult, setInsult] = React.useState<string>(
    insults[Math.floor(Math.random() * insults.length)]
  );

  React.useEffect(() => {
    if (open) {
      setInsult(insults[Math.floor(Math.random() * insults.length)]);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description ?? insult}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "var(--secondary-font-color)" }}
          onClick={onCancel}
        >
          Try Again
        </Button>
      </DialogActions>
    </Dialog>
  );
};
