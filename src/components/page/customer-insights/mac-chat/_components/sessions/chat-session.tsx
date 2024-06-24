import { ScrollArea } from '@/components/ui/scroll-area';
import { groupByDate, soryObjectByOrder } from '@/lib/utils';
import { Fragment } from 'react';
import MockSession from '../../mock-session.json';
import SessionButton from './session-button';

interface ISession {
  created: string;
  session_id: string;
  session_name: string;
  user_id: string;
  user_name: string;
}

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
  console.log('will rerender');
  const sessions = soryObjectByOrder(
    groupByDate(MockSession, 'created'),
    SessionOrder
  );
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
        <SessionButton key={session_id} id={session_id}>
          <span className='whitespace-nowrap w-full overflow-hidden text-ellipsis'>
            {session_name}
          </span>
        </SessionButton>
      ))}
    </div>
  );
}

export default ChatSession;
