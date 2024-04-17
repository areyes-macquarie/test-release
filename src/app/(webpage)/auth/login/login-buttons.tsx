'use client';

import { Button } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { useMsal } from '@azure/msal-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

type Props = {
  appHostUrl: string;
};

export default function LoginButtons({ ...props }: Props) {
  const router = useRouter();
  const { instance, accounts } = useMsal();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext?.isLoggedIn()) {
      router.push(props.appHostUrl);
    }
  }, [userContext?.isLoggedIn()]);

  return (
    <>
      {userContext?.isLoggedIn() ? (
        <Button
          className='text-2xl font-bold rounded-full px-10 py-8'
          onClick={async () =>
            await instance.logout({
              account: accounts[0],
              logoutHint: accounts[0].nativeAccountId,
              postLogoutRedirectUri: `${props.appHostUrl}/auth/login`,
            })
          }
        >
          Logout
        </Button>
      ) : (
        <Button
          className='text-2xl font-bold rounded-full px-10 py-8'
          onClick={async () =>
            await instance.loginRedirect({
              scopes: ['User.Read'],
              redirectUri: props.appHostUrl,
            })
          }
        >
          Login with Azure AAD
        </Button>
      )}
    </>
  );
}
