import ChatSession from '@/components/page/customer-insights/mac-chat/_components/sessions/chat-session';

function MacChat({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <ChatSession />
      {children}
    </div>
  );
}

export default MacChat;
