const baseUrl = "";

// Challenge
export const submitFlagUrl = `${baseUrl}/api/challenge/submit`;
export const getCurrentChallengeUrl = `${baseUrl}/api/challenge/current`;
export const getChallengeUrl = (challengeId: number) =>
  `${baseUrl}/api/challenge/${challengeId}`;
export const resetChallengeUrl = `${baseUrl}/api/challenge/reset`;
export const getChallengesCompletedCountUrl = `${baseUrl}/api/challenge/completed`;

// Auth
export const loginUrl = `${baseUrl}/api/auth/login`;
export const registerUrl = `${baseUrl}/api/auth/register`;
export const authUserUrl = `${baseUrl}/api/auth/user`;
