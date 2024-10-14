import { create } from "zustand";
import { checkStatus, handleError } from "../../../apis/utils";
import { loginApi, registerUserApi } from "../../../apis/Auth";
import { UserModel } from "../../../apis/Auth/typings";

interface AuthState {
  login: (
    username: string, // can also be username
    password: string,
    callback: (token: string, user: UserModel) => void
  ) => Promise<boolean>;
  register: (
    username: string,
    password: string,
    callback: (token: string, user: UserModel) => void
  ) => Promise<boolean>;
}

const initialStates = {};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialStates,
  login: async (username: string, password: string, callback) => {
    try {
      const response = checkStatus(await loginApi({ username, password }));
      const { token, user } = response.data;
      callback(token, user);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  },
  register: async (username: string, password: string, callback) => {
    try {
      const response = checkStatus(
        await registerUserApi({ username, password })
      );
      const { token, user } = response.data;
      callback(token, user);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  },
}));
