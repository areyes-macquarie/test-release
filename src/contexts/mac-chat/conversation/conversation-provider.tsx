'use client';

import UserContext from '@/contexts/user/user-context';
import { Session } from '@/lib/customer-insights/types';
import { groupByDate, sortObjectByOrder } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ReactNode, useContext, useMemo, useState } from 'react';
import ConversationContext, { ActiveSessionId } from './conversation-context';

type ConversationProviderProps = {
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

function ConversationProvider({ children }: ConversationProviderProps) {
  const [rawSessions, setNewSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<ActiveSessionId>(null);

  const sessions = useMemo(
    () =>
      sortObjectByOrder(groupByDate(rawSessions, 'created'), SessionOrder) ||
      null,
    [rawSessions]
  );

  const contextValue = useMemo(
    () => ({
      sessions,
      setNewSessions,
      activeSessionId,
      setActiveSessionId,
    }),
    [sessions]
  );

  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
}

export default ConversationProvider;
