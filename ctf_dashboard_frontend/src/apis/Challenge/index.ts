import { ChallengeNumberEnum } from "../enums";
import { HTTPMethod } from "../typings";
import {
  getChallengeUrl,
  getCurrentChallengeUrl,
  resetChallengeUrl,
  submitFlagUrl,
} from "../urls";
import { fetchWithAuth } from "../utils";
import { GetChallengeResponseModel, SubmitFlagResponseModel } from "./typings";

export const submitFlagApi = async (
  challenge: ChallengeNumberEnum,
  flag: any
) => {
  const response = await fetchWithAuth(submitFlagUrl, {
    method: HTTPMethod.POST,
    body: JSON.stringify({ challenge, flag }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json() as unknown as SubmitFlagResponseModel;
};

export const getCurrentChallengeApi = async (body?: any) => {
  const response = await fetchWithAuth(getCurrentChallengeUrl, {
    method: HTTPMethod.POST,
    body: JSON.stringify(body ?? {}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json() as unknown as GetChallengeResponseModel;
};

export const getChallengeApi = async (
  challenge: ChallengeNumberEnum
): Promise<any> => {
  const response = await fetch(getChallengeUrl(challenge), {
    method: HTTPMethod.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json() as unknown as GetChallengeResponseModel;
};

export const resetChallengeApi = async () => {
  const response = await fetchWithAuth(resetChallengeUrl, {
    method: HTTPMethod.POST,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json() as unknown as GetChallengeResponseModel;
};
