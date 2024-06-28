import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';

export type ChatHistoryType = {
  chatHistory: ReactNode[];
  setChatHistory: Dispatch<SetStateAction<ReactNode[]>>;
  chatSession: string;
  setChatSession: Dispatch<SetStateAction<string>>;
};

const ChatHistoryContext = createContext<ChatHistoryType | null>(null);

export default ChatHistoryContext;
