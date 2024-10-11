import React, { ReactNode } from "react";
import { authUserApi, loginApi } from "../apis/Auth";
import { UserModel } from "../apis/Auth/typings";
import { useChallengeStore } from "../zustand/apis/Challenge";

// Define types for the authentication state and context
interface AuthState {
  token: string | null;
  user: UserModel | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  auth: AuthState;
  login: (token: string, user: UserModel) => void;
  logout: () => void;
}

// Create Context
export const AuthContext = React.createContext<AuthContextProps>({
  auth: {
    token: null,
    user: null,
    loading: true,
  },
  login: () => {},
  logout: () => {},
});

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = React.useState<AuthState>({
    token: localStorage.getItem("token"),
    user: null,
    loading: true,
  });

  const { resetUserInfo, setUserInfo } = useChallengeStore();

  React.useEffect(() => {
    const loadUser = async () => {
      if (auth.token) {
        try {
          const res = await authUserApi(auth.token);
          setAuth({
            token: res.data.token,
            user: res.data.user,
            loading: false,
          });
        } catch (err) {
          console.error(err);
          setAuth({ token: null, user: null, loading: false });
          localStorage.removeItem("token");
        }
      } else {
        setAuth({ token: null, user: null, loading: false });
      }
    };

    loadUser();
  }, []);

  const login = (token: string, user: UserModel) => {
    localStorage.setItem("token", token);
    setUserInfo(user);
    setAuth({ token: token, user: user, loading: false });
  };

  const logout = () => {
    localStorage.removeItem("token");
    resetUserInfo();
    setAuth({ token: null, user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
