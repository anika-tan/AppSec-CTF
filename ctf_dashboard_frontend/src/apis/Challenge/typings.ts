import { HTTPStatusBody } from "../typings";

export interface ChallengeModel {
  id: number;
  title: string;
  description: string;
  link: string;
  hints: string[];
}

export interface GetChallengeResponseModel {
  status: HTTPStatusBody;
  data: {
    challenge: ChallengeModel;
  };
}

export interface SubmitFlagResponseModel {
  status: HTTPStatusBody;
  data: {
    message: string;
    success: boolean;
  };
}

export interface GetChallengesCompletedCountResponseModel {
  status: HTTPStatusBody;
  data: {
    completedChallenges: {
      id: number;
      completed_users: number;
      title: string;
    }[];
  };
}
