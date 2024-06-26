'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import useSessions from '@/hooks/use-sessions';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext } from 'react';

type SessionButtonProps = ButtonProps & {
  children: ReactNode;
  id: string | number;
};
function SessionButton({ id, children, ...rest }: SessionButtonProps) {
  const userContext = useContext(UserContext);
  const { activeSessionId, setActiveSessionId } = useSessions();
  const macChatBasePath = `${userContext?.getBasePath()}/customer-insights/mac-chat`;
  const pathname = usePathname();
  const router = useRouter();
  const toPath = id ? `/${id}` : '';
  const basePath = `${macChatBasePath}${toPath}`;

  const routeId = pathname.replace(macChatBasePath, '');
  console.log(activeSessionId, id);
  const isActive =
    routeId === '' ? activeSessionId === id : pathname === basePath;

  const handleOnClick = () => {
    console.log(id);
    setActiveSessionId(id === '' ? null : id);
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
