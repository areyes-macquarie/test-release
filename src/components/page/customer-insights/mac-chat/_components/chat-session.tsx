import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { groupByDate } from '@/lib/utils';
import { Fragment } from 'react';
import MockSession from '../mock-session.json';

interface ISession {
  created: string;
  session_id: string;
  session_name: string;
  user_id: string;
  user_name: string;
}

function ChatSession() {
  const sessions = groupByDate(MockSession, 'created');
  return (
    <div className='h-full w-[300px]'>
      <ScrollArea className='h-[calc(100vh-66px)] border-r border:bg-muted '>
        <div className='flex flex-col gap-7 px-3 py-5 w-[300px]'>
          {Object.entries(sessions).map(([date, session]) => (
            <Fragment key={date}>
              <GroupSession session={session} title={date} />
            </Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

type GroupSession = {
  session: ISession[];
  title: string;
};

function GroupSession({ session, title }: GroupSession) {
  return (
    <div className='w-full flex flex-col gap-1'>
      <p className='px-4 text-sm text-muted-foreground w-full'> {title}</p>
      {session.map(({ session_id, session_name }) => (
        <Button key={session_id} variant='ghost' className='text-left'>
          <span className='whitespace-nowrap w-full overflow-hidden text-ellipsis'>
            {session_name}
          </span>
        </Button>
      ))}
    </div>
  );
}

export default ChatSession;
