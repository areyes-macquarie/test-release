import { Session } from '@/lib/customer-insights/types';
import { createContext, Dispatch, SetStateAction } from 'react';

export type ChatSessionType = {
  sessions: Session[];
  setSessions: Dispatch<SetStateAction<Session[]>>;
  initialSessions: (sessions: Session[]) => void;
};

const ChatSessionContext = createContext<ChatSessionType | null>(null);

export default ChatSessionContext;
