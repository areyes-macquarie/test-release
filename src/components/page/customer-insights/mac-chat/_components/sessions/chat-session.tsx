'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import useSessions from '@/hooks/use-sessions';
import { Fragment, useEffect, useState } from 'react';
import GroupSessionList from './chat-group-session-list';
import NewChatButton from './new-chat-button';
import SessionLoading from './sessions-loading';

function ChatSession() {
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const { sessions, initialSessions, activeSessionId } = useSessions();
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const response = await apiClient.getUserChatSession();

      initialSessions(response.objects);
    } catch (error) {
      console.log('Error while fetching user chat session: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!apiReady) return;
    void fetchSessions();
  }, [apiReady]);

  // TODO: once api is working
  // 1. Store the result list
  // 2. Add loading skeleton while fetching session list
  // 3. Update fetch function to be reuse with infinite fetching
  return (
    <div className='min-h-dvh h-full w-[300px] border-r border:bg-muted'>
      <div className='h-[50px] w-full flex justify-end items-center px-3 py-5'>
        <NewChatButton />
      </div>
      <ScrollArea className='h-[calc(100vh-120px)]'>
        <div className='flex flex-col gap-7 p-3 w-[300px]'>
          {loading ? (
            <SessionLoading />
          ) : (
            Object.entries(sessions).map(([date, session]) => (
              <Fragment key={date}>
                <GroupSessionList
                  sessions={session}
                  title={date}
                  activeSessionId={activeSessionId}
                />
              </Fragment>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ChatSession;
