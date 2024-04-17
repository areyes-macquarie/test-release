'use client';

import { UserInfo } from '@/contexts/user/user-context';
import UserContextProvider from '@/contexts/user/user-provider';
import { ReactNode } from 'react';
import { TabSessionObserver } from './tab-session-observer';

type Props = {
  children?: ReactNode;
  user?: UserInfo | null;
};

export const TabSessionProvider = ({ ...props }: Props) => {
  return (
    <UserContextProvider user={props.user}>
      <TabSessionObserver>{props.children}</TabSessionObserver>
    </UserContextProvider>
  );
};
