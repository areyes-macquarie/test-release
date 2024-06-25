import { Session } from '@/lib/customer-insights/types';
import { createContext } from 'react';

export type ChatSessionType = {
  sessions: Session[];
  setSessions: (session: Session) => void;
  initialSessions: (sessions: Session[]) => void;
};

const ChatSessionContext = createContext<ChatSessionType | null>(null);

export default ChatSessionContext;
