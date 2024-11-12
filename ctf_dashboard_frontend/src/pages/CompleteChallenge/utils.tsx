import { duration } from "@mui/material";

export interface CompleteChallengeStoryLineModel {
  text: string;
  duration: string; // duration to wait before next line
}

export interface CompleteChallengeStoryBlockModel {
  storyLine: CompleteChallengeStoryLineModel[];
  duration: string; // after storylines all output, wait for this duration before next block
}

export interface CompleteChallengeStoryModel {
  storyBlocks: CompleteChallengeStoryBlockModel[];
}

export const CompleteChallengeData: CompleteChallengeStoryModel = {
  storyBlocks: [
    {
      storyLine: [
        {
          text: "You have sent the data to the Agency of [redacted].",
          duration: "2.5s",
        },
        {
          text: "Your partner congratulated you for the successful bust.",
          duration: "2.5s",
        },
        {
          text: "The involved criminals and companies were going to be arrested.",
          duration: "2.5s",
        },
      ],
      duration: "4s",
    },
    {
      storyLine: [
        {
          text: "“Great work!” Your partner told you to get a well deserved rest.",
          duration: "2.5s",
        },
      ],
      duration: "4s",
    },
    {
      storyLine: [
        {
          text: "You went to bed and took a fat nap. zzzzzz……",
          duration: "4s",
        },
      ],
      duration: "2s",
    },
    {
      storyLine: [
        {
          text: "*PONG!!!*",
          duration: "1.5s",
        },
        {
          text: "You heard a loud thump. Sounds like someone slammed the car door.",
          duration: "3s",
        },
        {
          text: "You wanted to check the source of the sound, but you could not move your body.",
          duration: "2s",
        },
        {
          text: "Your eyes remained shut. Perhaps it was sleep paralysis.",
          duration: "3s",
        },
        {
          text: "After all, you have been up for the past 16 hours without rest.",
          duration: "4s",
        },
        {
          text: "“This could just be a dream,” you thought, and went back to nap, without the slightest care.",
          duration: "4s",
        },
      ],
      duration: "4.5s",
    },
    {
      storyLine: [
        {
          text: "A blinding light shone upon your eyes. It was the reflection of your partner’s bald head.",
          duration: "4s",
        },
        {
          text: "You saw him standing next to a big burly man dressed in black.",
          duration: "3s",
        },
        {
          text: "You were tied down to a chair, unable to move even an inch.",
          duration: "3s",
        },
      ],
      duration: "3.5s",
    },
    {
      storyLine: [
        {
          text: "Your partner walked slowly towards you, crouched then to your eye level, and whispered into your ears,",
          duration: "4s",
        },
        {
          text: "“Thanks for taking care of the Kingpin, but you know too much.”",
          duration: "3s",
        },
      ],
      duration: "3s",
    },
    {
      storyLine: [
        {
          text: "Slowly, your partner raised a gun to your forehead.",
          duration: "3s",
        },
        {
          text: "“Yea yea I’ve heard this story a hundred times already, just unalive me and I’ll see you tomorrow,”",
          duration: "2s",
        },
        {
          text: "you said in a sarcastic tone.",
          duration: "4s",
        },
        {
          text: "Your partner looked at you with a raised eyebrow. “You were always the weird one.”",
          duration: "2.5s",
        },
      ],
      duration: "5s",
    },
    {
      storyLine: [
        {
          text: "*BANG!!!*",
          duration: "1.5s",
        },
      ],
      duration: "5s",
    },
    {
      storyLine: [
        { text: "Created by", duration: "2s" },
        { text: "Anika :D", duration: "2s" },
        { text: " and ", duration: "1s" },
        { text: "Bryan :>", duration: "2s" },
      ],
      duration: "5s",
    },
  ],
};
