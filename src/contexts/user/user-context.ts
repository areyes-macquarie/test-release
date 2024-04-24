import { createContext } from 'react';

export type UserInfo = {
  id: string;
  email: string;
  name: string;
  token: string;
};

export type UserContextCore = UserInfo & {
  setUserContext: (_data?: UserInfo) => void;
  getUserContext: () => UserInfo | undefined | null;
  getBasePath: () => string;
  setBasePath: (_path: string) => void;
  isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextCore | null>(null);

export default UserContext;
