import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react';
import api from '../services/apiClient';

const APP_NAME = process.env.REACT_APP_NAME;

type User = {
  id: string;
  name: string;
  email: string;
};
type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
};

type AuthState = {
  token: string;
  user: User;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any): ReactElement {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(`${APP_NAME}:token`);
    const user = localStorage.getItem(`${APP_NAME}:user`);

    if (token && user) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('auth/login', {
      email,
      password,
    });

    const { accessToken, user } = response.data;

    localStorage.setItem(`${APP_NAME}:token`, accessToken);
    localStorage.setItem(`${APP_NAME}:user`, JSON.stringify(user));

    api.defaults.headers.common.authorization = `Bearer ${accessToken}`;

    setData({ token: accessToken, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(`${APP_NAME}:token`);
    localStorage.removeItem(`${APP_NAME}:user`);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
      localStorage.setItem(`${APP_NAME}:user`, JSON.stringify(user));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
