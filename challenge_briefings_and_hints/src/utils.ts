export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateEmail = (email: string) => {
  return email && /\S+@\S+\.\S+/.test(email);
};

export const validatePassword = (password: string) => {
  const isValid = password && password.length >= 4;

  return isValid;
};

export const validateUsername = (username: string) => {
  return username && username.length >= 4;
};