import { create } from "zustand";
import { checkStatus, handleError } from "../../../apis/utils";
import { submitFlagApi } from "../../../apis/Challenge";
import {
  ChallengeNumberEnum,
  ChallengeProgressEnum,
} from "../../../apis/enums";
import { UserModel } from "../../../apis/Auth/typings";

interface ChallengeState {
  currentChallenge: ChallengeNumberEnum;
  currentChallengeProgress: ChallengeProgressEnum | null;
  userInfo: UserModel;

  setCurrentChallenge: (challenge: ChallengeNumberEnum) => void;
  setCurrentChallengeProgress: (progress: ChallengeProgressEnum) => void;
  getCurrentChallenge: () => Promise<void>;

  resetChallenge: () => void;

  setUserInfo: (userInfo: UserModel) => void;
  resetUserInfo: () => void;

  submitFlag: (
    challenge: ChallengeNumberEnum,
    flag: string
  ) => Promise<boolean>;
}

const initialStates = {
  userInfo: {
    id: "",
    username: "",
  },
  currentChallenge: ChallengeNumberEnum.NONE,
  currentChallengeProgress: ChallengeProgressEnum.NOT_STARTED,
};

export const useChallengeStore = create<ChallengeState>((set, get) => ({
  ...initialStates,
  setCurrentChallenge: (challenge) =>
    set({
      currentChallenge: challenge ?? ChallengeNumberEnum.NONE,
      currentChallengeProgress: ChallengeProgressEnum.IN_PROGRESS,
    }),
  setCurrentChallengeProgress: (progress) =>
    set({ currentChallengeProgress: progress }),

  submitFlag: async (challenge, flag) => {
    try {
      // const response = checkStatus(await submitFlagApi(challenge, flag));
      const success = Math.random() > 0.1;
      console.log("Submitting flag...", challenge, flag, "Success:", success);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading

      if (success) {
        set({ currentChallengeProgress: ChallengeProgressEnum.COMPLETED });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      handleError(error);
      return false;
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
  setUserInfo: (userInfo) => set({ userInfo }),
  resetUserInfo: () => set({ userInfo: initialStates.userInfo }),
}));
