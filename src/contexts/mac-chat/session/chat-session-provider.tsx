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

  const sessions = useMemo(
    () => sortObjectByOrder(groupByDate(rawSessions, 'created'), SessionOrder),
    [rawSessions]
  );

  const contextValue = useMemo(
    () => ({
      sessions,
      setSession,
      initialSessions,
      activeSessionId,
      setActiveSessionId,
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
