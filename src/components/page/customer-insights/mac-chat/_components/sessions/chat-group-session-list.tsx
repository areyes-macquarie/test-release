import { Session } from '@/lib/customer-insights/types';
import OptionsButton from './buttons/options-button';
import SessionButton from './buttons/session-button';

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
      {sortedSessions.map((session, index) => (
        <SessionButton
          key={`${session.session_id}-${index}`}
          path={`/${session.session_id}`}
          className='space-x-2 group'
        >
          <span className='text-left whitespace-nowrap w-full overflow-hidden text-ellipsis'>
            {session.session_name}
          </span>
          <OptionsButton session={session} />
        </SessionButton>
      ))}
    </div>
  );
}

export default GroupSessionList;
