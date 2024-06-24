import { Session } from '@/lib/customer-insights/types';
import SessionButton from './session-button';

type GroupSession = {
  session: Session[];
  title: string;
};

function GroupSessionList({ session, title }: GroupSession) {
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

export default GroupSessionList;
