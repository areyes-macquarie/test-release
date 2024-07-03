import ConversationContext from '@/contexts/mac-chat/conversation/conversation-context';
import UserContext from '@/contexts/user/user-context';
import { Session } from '@/lib/customer-insights/types';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

function useConversation() {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error(
      'useConversation() must be called within ChatSessionProvider'
    );
  }

  const userContext = useContext(UserContext);
  const macChatBasePath = `${userContext?.getBasePath()}/customer-insights/mac-chat`;
  const router = useRouter();
  const { setNewSessions, setActiveSessionId, activeSessionId } = context;

  const setSession = (session: Session) => {
    setNewSessions((prevSession) => [...prevSession, session]);
    const newPath = `${macChatBasePath}/${session.session_id}`;
    router.push(newPath, { scroll: true });
  };

  const initialSessions = (sessions: Session[]) => {
    setNewSessions(sessions);
    const latestSession = sessions.reduce((a, b) => {
      return new Date(a.created) > new Date(b.created) ? a : b;
    });

    if (latestSession) {
      setActiveSessionId(latestSession.session_id);
      const basePath = `${macChatBasePath}/${latestSession.session_id}`;
      router.push(basePath);
    }
  };

  const updateSessions = (sessions: Session[]) => {
    setNewSessions((prevSession) => [...prevSession, ...sessions]);
  };

  const removeSession = (sessionId: string) => {
    setNewSessions((prevSession) => [
      ...prevSession.filter(({ session_id }) => sessionId !== session_id),
    ]);
    setActiveSessionId(null);
    const basePath = `${macChatBasePath}`;
    router.push(basePath);
  };

  return {
    ...context,
    setSession,
    initialSessions,
    removeSession,
    updateSessions,
  };
}

export default useConversation;
