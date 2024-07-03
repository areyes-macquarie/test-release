import { createContext } from 'react';
import { AppViewType } from './user-provider';

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
  getAppType: () => AppViewType;
};

const UserContext = createContext<UserContextCore | null>(null);

export default UserContext;
