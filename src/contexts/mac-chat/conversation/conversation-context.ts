import { Session } from '@/lib/customer-insights/types';
import { createContext, Dispatch, SetStateAction } from 'react';

export type ActiveSessionId = string | null;

export type ConversationContextType = {
  sessions: Record<string, Session[]>;
  setNewSessions: Dispatch<SetStateAction<Session[]>>;
  activeSessionId: ActiveSessionId;
  setActiveSessionId: Dispatch<SetStateAction<ActiveSessionId>>;
  setSession?: (session: Session) => void;
  removeSession?: (sessionId: string) => void;
  initialSessions?: (sessions: Session[]) => void;
};

const ConversationContext = createContext<ConversationContextType | null>(null);

export default ConversationContext;
