import { Session } from '@/lib/customer-insights/types';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import SessionButton from './session-button';

type GroupSession = {
  sessions: Session[];
  title: string;
};

function GroupSessionList({ sessions, title }: GroupSession) {
  // Sort the sessions by the created date (which is a string)
  const sortedSessions = sessions.sort((a, b) => {
    const dateA = new Date(a.created).getTime();
    const dateB = new Date(b.created).getTime();
    return dateB - dateA;
  });

  return (
    <div className='w-full flex flex-col gap-1'>
      <p className='px-4 text-sm text-muted-foreground w-full'> {title}</p>
      {sortedSessions.map(({ session_id, session_name }) => (
        <SessionButton key={session_id} id={session_id} className='space-x-2'>
          <span className='text-left whitespace-nowrap w-full overflow-hidden text-ellipsis'>
            {session_name}
          </span>
          <DotsHorizontalIcon className='size-4' />
        </SessionButton>
      ))}
    </div>
  );
}

export default GroupSessionList;
