import { ChallengeNumberEnum } from "../enums";
import { HTTPMethod } from "../typings";
import { submitFlagUrl } from "../urls";

export const submitFlagApi = async (
  challenge: ChallengeNumberEnum,
  flag: any
): Promise<any> => {
  const response = await fetch(submitFlagUrl, {
    method: HTTPMethod.POST,
    body: JSON.stringify({ challenge, flag }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
