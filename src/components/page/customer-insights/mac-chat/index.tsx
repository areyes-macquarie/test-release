import { ChatSection } from './_components/chat-section';
import ChatSession from './_components/chat-session';

export default function CustomerInsightsMacChatPage() {
  return (
    <div className='flex'>
      <ChatSession />
      <ChatSection />
    </div>
  );
}
