import { HTTPStatusBody } from "../typings";

export interface RegisterUserRequestModel {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserRequestModel {
  email: string;
  password: string;
}

export interface GetUserRequestModel {
  userId: string;
}

// Response model
export interface RegisterUserResponseModel {
  status: HTTPStatusBody;
  data: {
    token: string;
    user: UserModel;
  };
}

export interface LoginUserResponseModel {
  status: HTTPStatusBody;
  data: {
    token: string;
    user: UserModel;
  };
}

export interface GetUserResponseModel {
  status: HTTPStatusBody;
  data: {
    user: UserModel;
  };
}

// User Model
export interface UserModel {
  id: string;
  username: string;
}
