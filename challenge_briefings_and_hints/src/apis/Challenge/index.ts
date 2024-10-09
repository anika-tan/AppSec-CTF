import { HTTPMethod } from "../typings";
import { submitFlagUrl } from "../urls";

export const submitFlagApi = async (flag: any): Promise<any> => {
  const response = await fetch(submitFlagUrl, {
    method: HTTPMethod.POST,
    body: JSON.stringify({ flag }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
