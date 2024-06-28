'use client';

import { ReactNode, useMemo, useState } from 'react';
import ChatHistoryContext from './history-context';

type ChatHistoryProviderProps = {
  children: ReactNode;
};

function ChatHistoryProvider({ children }: ChatHistoryProviderProps) {
  const [chatHistory, setChatHistory] = useState<ReactNode[]>([]);
  const [chatSession, setChatSession] = useState('');

  const contextValue = useMemo(
    () => ({
      chatHistory,
      setChatHistory,
      chatSession,
      setChatSession,
    }),
    [chatHistory, chatSession]
  );
  return (
    <ChatHistoryContext.Provider value={contextValue}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export default ChatHistoryProvider;
