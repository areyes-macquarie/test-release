'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext } from 'react';

type SessionButtonProps = ButtonProps & {
  children: ReactNode;
  path: string;
};
function SessionButton({ path, children, ...rest }: SessionButtonProps) {
  const userContext = useContext(UserContext);
  const macChatPath = `${userContext?.getBasePath()}/customer-insights/mac-chat`;
  const pathname = usePathname();
  const router = useRouter();

  const basePath = `${macChatPath}${path}`;
  const routeId = pathname.replace(macChatPath, '');
  const isActive = routeId === path;

  const handleOnClick = () => {
    router.push(basePath, { scroll: false });
  };
  return (
    <Button
      onClick={handleOnClick}
      variant={isActive ? 'secondary' : 'ghost'}
      className='text-left'
      {...rest}
    >
      {children}
    </Button>
  );
}

export default SessionButton;
