'use client';

import { ReactNode, useMemo, useState } from 'react';
import ChatHistoryContext from './history-context';

type ChatHistoryProviderProps = {
  children: ReactNode;
};

function ChatHistoryProvider({ children }: ChatHistoryProviderProps) {
  const [chatHistory, setChatHistory] = useState<ReactNode[]>([]);

  console.log(chatHistory);
  const contextValue = useMemo(
    () => ({
      chatHistory,
      setChatHistory,
    }),
    [history]
  );
  return (
    <ChatHistoryContext.Provider value={contextValue}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export default ChatHistoryProvider;
