import { create } from "zustand";
import { checkStatus, handleError } from "../../../apis/utils";
import { submitFlagApi } from "../../../apis/Challenge";
import {
  ChallengeNumberEnum,
  ChallengeProgressEnum,
} from "../../../apis/enums";

interface ChallengeState {
  currentChallenge: ChallengeNumberEnum;
  currentChallengeProgress: ChallengeProgressEnum | null;

  setCurrentChallenge: (challenge: ChallengeNumberEnum) => void;
  setCurrentChallengeProgress: (progress: ChallengeProgressEnum) => void;
  getCurrentChallenge: () => Promise<void>;

  resetChallenge: () => void;

  submitFlag: (flag: string) => Promise<void>;
}

const initialStates = {
  currentChallenge: ChallengeNumberEnum.NONE,
  currentChallengeProgress: ChallengeProgressEnum.NOT_STARTED,
};

export const useChallengeStore = create<ChallengeState>((set, get) => ({
  ...initialStates,
  setCurrentChallenge: (challenge) =>
    set({ currentChallenge: challenge ?? ChallengeNumberEnum.NONE }),
  setCurrentChallengeProgress: (progress) =>
    set({ currentChallengeProgress: progress }),

  submitFlag: async (flag) => {
    try {
      const response = checkStatus(await submitFlagApi(flag));
      set({ currentChallengeProgress: ChallengeProgressEnum.COMPLETED });
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  },
  getCurrentChallenge: async () => {
    try {
      // Fetch the current challenge from the database
      // const response = checkStatus(await getCurrentChallengeApi());
      const response = {
        data: {
          currentChallenge:
            get().currentChallenge ?? ChallengeNumberEnum.Challenge1,
          currentChallengeProgress:
            get().currentChallengeProgress ?? ChallengeProgressEnum.NOT_STARTED,
        },
      };

      set({ currentChallenge: response.data.currentChallenge });
      set({ currentChallengeProgress: response.data.currentChallengeProgress });
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  },
  resetChallenge: () => set({ ...initialStates }),
}));
