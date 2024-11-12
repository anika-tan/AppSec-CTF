import React from "react";
import { Typography } from "@mui/material";
import { CompleteChallengeStoryModel } from "../utils";

interface StoryDisplayProps {
  currentStory: CompleteChallengeStoryModel;
  onEnd?: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ currentStory, onEnd }) => {
  const [currentBlockIndex, setCurrentBlockIndex] = React.useState(0);
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);

  React.useEffect(() => {
    const currentBlock = currentStory.storyBlocks[currentBlockIndex];
    const currentLine = currentBlock.storyLine[currentLineIndex];

    // Calculate duration for the current line or block transition
    const duration =
      currentLineIndex < currentBlock.storyLine.length - 1
        ? parseFloat(currentLine.duration) * 1000
        : parseFloat(currentBlock.duration) * 1000;

    // Set a timeout to trigger `storyNext` after the duration
    const timer = setTimeout(() => {
      storyNext();
    }, duration);

    // Clean up timer on unmount or when dependencies change
    return () => clearTimeout(timer);
  }, [currentBlockIndex, currentLineIndex, currentStory]);

  const storyNext = () => {
    const currentBlock = currentStory.storyBlocks[currentBlockIndex];
    if (currentLineIndex < currentBlock.storyLine.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    } else if (currentBlockIndex < currentStory.storyBlocks.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
      setCurrentLineIndex(0);
    } else {
      onEnd && onEnd();
      // Story is complete; handle completion here if needed
    }
  };

  // Display all lines up to the current line index in the current block
  const currentStoryText = currentStory.storyBlocks[
    currentBlockIndex
  ].storyLine.map((line, lineIndex) => (
    <Typography
      key={`${currentBlockIndex}-${lineIndex}`}
      variant="h4"
      sx={{
        visibility: lineIndex <= currentLineIndex ? "visible" : "hidden",
        color: "var(--secondary-font-color)",
      }}
    >
      {line.text}
    </Typography>
  ));

  return <>{currentStoryText};</>;
};

export default StoryDisplay;
