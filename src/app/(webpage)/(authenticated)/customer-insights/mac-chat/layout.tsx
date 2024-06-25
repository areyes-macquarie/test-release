import ChatSession from '@/components/page/customer-insights/mac-chat/_components/sessions/chat-session';
import ChatHistoryProvider from '@/contexts/mac-chat/history/history-provider';
import ChatSessionProvider from '@/contexts/mac-chat/session/chat-session-provider';

function MacChat({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <ChatSessionProvider>
        <ChatSession />
        <ChatHistoryProvider>{children}</ChatHistoryProvider>
      </ChatSessionProvider>
    </div>
  );
}

export default MacChat;
