'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import { groupByDate, soryObjectByOrder } from '@/lib/utils';
import { Fragment, useMemo } from 'react';
import MockSession from '../../mock-session.json';
import GroupSessionList from './chat-group-session-list';

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

  const fetchSessions = async () => {
    try {
      const response = await apiClient.getUserChatSession();
    } catch (error) {
      console.log('Error while fetching user chat session: ', error);
    }
  };

  void fetchSessions();

  // TODO: once api is working
  // 1. Store the result list
  // 2. Add loading skeleton while fetching session list
  // 3. Update fetch function to be reuse with infinite fetching

  const sessions = useMemo(
    () => soryObjectByOrder(groupByDate(MockSession, 'created'), SessionOrder),
    [MockSession]
  );

  return (
    <div className='h-full w-[300px]'>
      <ScrollArea className='h-[calc(100vh-66px)] border-r border:bg-muted '>
        <div className='flex flex-col gap-7 px-3 py-5 w-[300px]'>
          {Object.entries(sessions).map(([date, session]) => (
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
