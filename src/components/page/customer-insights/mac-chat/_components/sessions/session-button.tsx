'use client';
import { Button } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { useRouter } from 'next/navigation';
import { ReactNode, useContext } from 'react';

type SessionButtonProps = {
  children: ReactNode;
  id: string | number;
};
function SessionButton({ id, children }: SessionButtonProps) {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const basePath = `${userContext?.getBasePath()}/customer-insights/mac-chat/${id}`;

  return (
    <Button
      onClick={() => router.push(basePath, { scroll: false })}
      variant='ghost'
      className='text-left'
    >
      {children}
    </Button>
  );
}

export default SessionButton;
