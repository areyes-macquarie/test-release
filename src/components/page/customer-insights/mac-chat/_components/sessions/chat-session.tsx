'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import useSessions from '@/hooks/use-sessions';
import { groupByDate, sortObjectByOrder } from '@/lib/utils';
import { Fragment, useEffect, useMemo } from 'react';
import GroupSessionList from './chat-group-session-list';
import NewChatButton from './new-chat-button';

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

function ChatSession() {
  const { apiClient } = useCustomerInsightsApiClient();
  const { sessions, initialSessions } = useSessions();

  const fetchSessions = async () => {
    try {
      const response = await apiClient.getUserChatSession();

      initialSessions(response.objects);
    } catch (error) {
      console.log('Error while fetching user chat session: ', error);
    }
  };

  useEffect(() => {
    void fetchSessions();
  }, []);

  // TODO: once api is working
  // 1. Store the result list
  // 2. Add loading skeleton while fetching session list
  // 3. Update fetch function to be reuse with infinite fetching

  const memoizeSession = useMemo(
    () => sortObjectByOrder(groupByDate(sessions, 'created'), SessionOrder),
    [sessions]
  );

  return (
    <div className='min-h-dvh h-full w-[300px] border-r border:bg-muted'>
      <div className='h-[50px] w-full flex justify-end items-center px-3 py-5'>
        <NewChatButton />
      </div>
      <ScrollArea className='h-[calc(100vh-120px)]'>
        <div className='flex flex-col gap-7 p-3 w-[300px]'>
          {Object.entries(memoizeSession).map(([date, session]) => (
            <Fragment key={date}>
              <GroupSessionList session={session} title={date} />
            </Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ChatSession;
