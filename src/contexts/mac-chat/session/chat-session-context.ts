import { Session } from '@/lib/customer-insights/types';
import { createContext, Dispatch, SetStateAction } from 'react';

export type ActiveSessionId = string | null;

export type ChatSessionType = {
  sessions: Record<string, Session[]>;
  setSession: (session: Session) => void;
  initialSessions: (sessions: Session[]) => void;
  activeSessionId: ActiveSessionId;
  setActiveSessionId: Dispatch<SetStateAction<ActiveSessionId>>;
};

const ChatSessionContext = createContext<ChatSessionType | null>(null);

export default ChatSessionContext;
