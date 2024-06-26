import ChatSessionContext from '@/contexts/mac-chat/session/chat-session-context';
import { useContext } from 'react';

function useSessions() {
  const context = useContext(ChatSessionContext);

  if (!context) {
    throw new Error(
      'useChatSession() must be called within ChatSessionProvider'
    );
  }

  return context;
}

export default useSessions;
