'use client';

import { Session } from '@/lib/customer-insights/types';
import { useRouter } from 'next/navigation';
import { ReactNode, useContext, useMemo, useState } from 'react';
import UserContext from '../../user/user-context';
import ChatSessionContext from './chat-session-context';

type ChatSessionProviderProps = {
  children: ReactNode;
};

function ChatSessionProvider({ children }: ChatSessionProviderProps) {
  const [sessions, setNewSessions] = useState<Session[]>([]);
  const userContext = useContext(UserContext);
  const router = useRouter();

  const setSessions = (session: Session) => {
    setNewSessions((prevSession) => [...prevSession, session]);
    const basePath = `${userContext?.getBasePath()}/customer-insights/mac-chat/${
      session.session_id
    }`;
    // router.push(basePath, { scroll: false });
  };

  const initialSessions = (sessions: Session[]) => {
    setNewSessions(sessions);
  };

  const contextValue = useMemo(
    () => ({
      sessions,
      setSessions,
      initialSessions,
    }),
    [sessions]
  );

  return (
    <ChatSessionContext.Provider value={contextValue}>
      {children}
    </ChatSessionContext.Provider>
  );
}

export default ChatSessionProvider;
