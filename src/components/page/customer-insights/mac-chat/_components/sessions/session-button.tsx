'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext } from 'react';

type SessionButtonProps = ButtonProps & {
  children: ReactNode;
  id: string | number;
};
function SessionButton({ id, children, ...rest }: SessionButtonProps) {
  const userContext = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();
  const toPath = id ? `/${id}` : '';
  const basePath = `${userContext?.getBasePath()}/customer-insights/mac-chat${toPath}`;
  return (
    <Button
      onClick={() => {
        router.push(basePath, { scroll: false });
      }}
      variant={pathname === basePath ? 'secondary' : 'ghost'}
      className='text-left'
      {...rest}
    >
      {children}
    </Button>
  );
}

export default SessionButton;
