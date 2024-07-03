import ChatSession from '@/components/page/customer-insights/mac-chat/_components/sessions/chat-session';
import ConversationProvider from '@/contexts/mac-chat/conversation/conversation-provider';
import ChatHistoryProvider from '@/contexts/mac-chat/history/history-provider';

function MacChatTabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <ConversationProvider>
        <ChatSession />
        <ChatHistoryProvider>{children}</ChatHistoryProvider>
      </ConversationProvider>
    </div>
  );
}

export default MacChatTabLayout;
