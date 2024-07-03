'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

import InfiniteScroll from '@/components/ui/infinite-scroll';
import UserContext from '@/contexts/user/user-context';
import useConversation from '@/hooks/use-conversation';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import usePaginate from '@/hooks/use-paginate';
import { cn } from '@/lib/utils';
import isEmpty from '@/services/shared/helpers/is-empty';
import { Loader2Icon } from 'lucide-react';
import { Fragment, useContext, useEffect, useState } from 'react';
import NewChatButton from './buttons/new-chat-button';
import GroupSessionList from './chat-group-session-list';
import SessionLoading from './sessions-loading';

function ChatSession() {
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const { sessions, initialSessions, updateSessions } = useConversation();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const {
    page,
    loading: paginateLoading,
    hasMore,
    updateState,
    setLoading: setPaginateLoading,
  } = usePaginate();

  const fetchSessions = async () => {
    page > 0 && setPaginateLoading(true);
    try {
      const response = await apiClient.getUserChatSession(page);
      updateState(response.meta, !isEmpty(response.objects));
      if (response.meta.page > 1) {
        updateSessions(response.objects);
      } else {
        initialSessions(response.objects);
      }
    } catch (error) {
      console.log('Error while fetching user chat session: ', error);
    } finally {
      setLoading(false);
      setPaginateLoading(false);
    }
  };
  useEffect(() => {
    if (!apiReady) return;
    if (isEmpty(sessions)) {
      void fetchSessions();
    }
  }, [apiReady]);

  // TODO: once api is working
  // 1. Store the result list
  // 2. Add loading skeleton while fetching session list
  // 3. Update fetch function to be reuse with infinite fetching
  return (
    <div className='h-full w-[300px] border-r border:bg-muted'>
      <div className='h-[50px] w-full flex justify-end items-center px-3 py-5'>
        <NewChatButton />
      </div>
      <ScrollArea
        className={cn(
          userContext?.getBasePath() === ''
            ? 'h-[calc(100vh-120px)]'
            : 'h-[calc(100vh-50px)]'
        )}
      >
        <div className='flex flex-col gap-7 p-3 w-[300px]'>
          {loading ? (
            <SessionLoading />
          ) : (
            <>
              {Object.entries(sessions).map(([date, session]) => (
                <Fragment key={date}>
                  <GroupSessionList sessions={session} title={date} />
                </Fragment>
              ))}
              <InfiniteScroll
                hasMore={hasMore}
                isLoading={paginateLoading}
                next={fetchSessions}
                threshold={1}
              >
                {hasMore && (
                  <div className='flex justify-center'>
                    <Loader2Icon className='h-4 w-4 animate-spin text-center ' />
                  </div>
                )}
              </InfiniteScroll>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ChatSession;
