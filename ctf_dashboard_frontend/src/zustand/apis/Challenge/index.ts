import { create } from "zustand";
import { checkStatus, handleError } from "../../../apis/utils";
import {
  getChallengeApi,
  getChallengesCompletedCountApi,
  getCurrentChallengeApi,
  resetChallengeApi,
  submitFlagApi,
} from "../../../apis/Challenge";
import {
  ChallengeNumberEnum,
  ChallengeProgressEnum,
} from "../../../apis/enums";
import { UserModel } from "../../../apis/Auth/typings";
import { ChallengeModel } from "../../../apis/Challenge/typings";

interface ChallengeState {
  currentChallenge: ChallengeNumberEnum;
  currentChallengeProgress: ChallengeProgressEnum;
  challengesInfo: Map<ChallengeNumberEnum, ChallengeModel>;
  currentChallengeInfo: ChallengeModel;
  userInfo: UserModel;
  highestChallenge: ChallengeNumberEnum;
  isStarted: boolean;
  successMessage: string;

  setIsStarted: (isStarted: boolean) => void;

  setCurrentChallenge: (challenge: ChallengeNumberEnum) => void;
  getCurrentChallenge: () => Promise<void>;
  setCurrentChallengeProgress: (progress: ChallengeProgressEnum) => void;
  getChallenge: (challengeId: number) => Promise<void>;

  resetChallenge: () => Promise<void>;

  setUserInfo: (userInfo: UserModel) => void;
  resetUserInfo: () => void;

  submitFlag: (
    challenge: ChallengeNumberEnum,
    flag: string
  ) => Promise<boolean>;

  leaderboard: { id: number; completed_users: number; title: string }[];
  getLeaderboard: () => Promise<void>;
}

const initialStates = {
  userInfo: {
    id: "",
    username: "",
  },
  currentChallenge: ChallengeNumberEnum.Challenge1,
  currentChallengeProgress: ChallengeProgressEnum.NOT_STARTED,
  currentChallengeInfo: {} as ChallengeModel,

  challengesInfo: new Map<ChallengeNumberEnum, ChallengeModel>(),
  highestChallenge: ChallengeNumberEnum.Challenge1,
  isStarted: false,
  leaderboard: [],
  successMessage: "",
};

export const useChallengeStore = create<ChallengeState>((set, get) => ({
  ...initialStates,
  setCurrentChallenge: (challenge) =>
    set({
      currentChallenge: challenge,
    }),
  setCurrentChallengeProgress: (progress) =>
    set({
      currentChallengeProgress: progress,
    }),
  submitFlag: async (challenge, flag) => {
    try {
      const response = checkStatus(await submitFlagApi(challenge, flag));

      if (response.data.success) {
        set({ currentChallengeProgress: ChallengeProgressEnum.COMPLETED });
        set({ successMessage: response.data.success_message });
        return true;
      } else {
        set({ successMessage: initialStates.successMessage });
        return false;
      }
    } catch (error) {
      set({ successMessage: initialStates.successMessage });
      console.error(error);
      handleError(error);
      return false;
    }
  },
  getCurrentChallenge: async () => {
    try {
      // If the user is at the end of the challenge, dont fetch the current challenge
      // if (get().currentChallenge === ChallengeNumberEnum.END) {
      //   return;
      // }

      // Fetch the current challenge from the database
      const response = checkStatus(await getCurrentChallengeApi());

      set({
        currentChallenge: response.data.challenge
          .id as unknown as ChallengeNumberEnum,
        highestChallenge: response.data.challenge
          .id as unknown as ChallengeNumberEnum,
        currentChallengeInfo: response.data.challenge,
      });

      // Set is started to true if the challenge is not NONE nor END, and not Challenge 1
      const id = response.data.challenge.id as unknown as ChallengeNumberEnum;
      set({
        isStarted:
          id !== ChallengeNumberEnum.NONE &&
          id !== ChallengeNumberEnum.END &&
          id !== ChallengeNumberEnum.Challenge1,
      });

      checkStatus(
        await getChallengeApi(
          response.data.challenge.id as unknown as ChallengeNumberEnum
        )
      );
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  },
  getChallenge: async (challengeId: number) => {
    try {
      get().setCurrentChallengeProgress(ChallengeProgressEnum.NOT_STARTED);
      if (challengeId === ChallengeNumberEnum.NONE) {
        return;
      }

      // If is saved in the store, return it
      if (get().challengesInfo.get(challengeId as ChallengeNumberEnum)) {
        set({
          currentChallengeInfo: get().challengesInfo.get(
            challengeId as ChallengeNumberEnum
          ),
        });
        return;
      }

      // Fetch the challenge from the database
      const response = checkStatus(await getChallengeApi(challengeId));

      get().challengesInfo.set(
        challengeId as ChallengeNumberEnum,
        response.data.challenge
      );

      set({
        currentChallengeInfo: response.data.challenge,
      });
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  },
  resetChallenge: async () => {
    try {
      checkStatus(await resetChallengeApi());
      set({ ...initialStates });
      // checkStatus(await getCurrentChallengeApi());
      await get().getCurrentChallenge();
    } catch (error) {
      console.error(error);
      handleError(error);
      set({ ...initialStates });
    }
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  resetUserInfo: () => set({ userInfo: initialStates.userInfo }),
  setIsStarted: (isStarted) => set({ isStarted }),
  getLeaderboard: async () => {
    try {
      const response = checkStatus(await getChallengesCompletedCountApi());
      set({ leaderboard: response.data.completedChallenges });
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  },
}));
