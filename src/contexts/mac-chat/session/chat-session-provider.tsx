'use client';

import UserContext from '@/contexts/user/user-context';
import { Session } from '@/lib/customer-insights/types';
import { groupByDate, sortObjectByOrder } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ReactNode, useContext, useMemo, useState } from 'react';
import ChatSessionContext, { ActiveSessionId } from './chat-session-context';

type ChatSessionProviderProps = {
  children: ReactNode;
};

const SessionOrder = [
  'Today',
  'Yesterday',
  '7 days ago',
  '30 days ago',
  'December',
  'November',
  'October',
  'September',
  'August',
  'July',
  'June',
  'May',
  'April',
  'March',
  'February',
  'Jannuary',
];

function ChatSessionProvider({ children }: ChatSessionProviderProps) {
  const userContext = useContext(UserContext);
  const [rawSessions, setNewSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<ActiveSessionId>(null);
  const macChatBasePath = `${userContext?.getBasePath()}/customer-insights/mac-chat`;
  const router = useRouter();

  const setSession = (session: Session) => {
    setNewSessions((prevSession) => [...prevSession, session]);
    const newPath = `${macChatBasePath}/${session.session_id}`;
    router.push(newPath, { scroll: true });
  };

  const initialSessions = (sessions: Session[]) => {
    setNewSessions(sessions);
    const latestSession = sessions.reduce((a, b) => {
      return new Date(a.created) > new Date(b.created) ? a : b;
    });

    if (latestSession) {
      setActiveSessionId(latestSession.session_id);
      const basePath = `${macChatBasePath}/${latestSession.session_id}`;
      router.push(basePath);
    }
  };

  const removeSession = (sessionId: string) => {
    setNewSessions((prevSession) => [
      ...prevSession.filter(({ session_id }) => sessionId !== session_id),
    ]);
    //TODO:
    // 1. If equal to activeSessionId set active session to null
    // 2. clear history and redirect to new
  };

  const sessions = useMemo(
    () =>
      sortObjectByOrder(groupByDate(rawSessions, 'created'), SessionOrder) ||
      null,
    [rawSessions]
  );

  const contextValue = useMemo(
    () => ({
      sessions,
      setSession,
      initialSessions,
      activeSessionId,
      setActiveSessionId,
      removeSession,
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
