'use client';

import UserContext, { UserInfo } from '@/contexts/user/user-context';
import { app, authentication } from '@microsoft/teams-js';
import { ReactNode, useContext, useEffect } from 'react';

type Props = {
  children?: ReactNode;
  user?: UserInfo | null;
};

export const TabSessionObserver = ({ ...props }: Props) => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    app
      .initialize()
      .then(async () => {
        await Promise.all([
          app.getContext(),
          authentication.getAuthToken(),
        ]).then(([context, token]) => {
          userContext?.setUserContext({
            id: context.user?.id ?? '',
            email: context.user?.userPrincipalName ?? '',
            name:
              context.user?.displayName ??
              context.user?.userPrincipalName ??
              '',
            token: token,
            basePath: '/tabs',
          });
        });
      })
      .catch((err) => console.log('Initialization Failed: ', err));
  }, []);

  return <>{props.children}</>;
};
