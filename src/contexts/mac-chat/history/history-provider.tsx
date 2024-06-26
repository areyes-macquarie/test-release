'use client';

import { ReactNode, useMemo, useState } from 'react';
import ChatHistoryContext from './history-context';

type ChatHistoryProviderProps = {
  children: ReactNode;
};

function ChatHistoryProvider({ children }: ChatHistoryProviderProps) {
  const [chatHistory, setChatHistory] = useState<ReactNode[]>([]);

  const contextValue = useMemo(
    () => ({
      chatHistory,
      setChatHistory,
    }),
    [chatHistory]
  );
  return (
    <ChatHistoryContext.Provider value={contextValue}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export default ChatHistoryProvider;
