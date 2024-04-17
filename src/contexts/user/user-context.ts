import { createContext } from 'react';

export type UserInfo = {
  id: string;
  email: string;
  name: string;
  basePath: string;
  token: string;
};

export type UserContextCore = UserInfo & {
  setUserContext: (_data?: UserInfo) => void;
  getUserContext: () => UserInfo | undefined | null;
  isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextCore | null>(null);

export default UserContext;
