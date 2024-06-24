import { ChatSection } from './_components/chat-section';

type CustomerInsightsMacChatPageProps = {
  slug: string[];
};

export default function CustomerInsightsMacChatPage({
  slug,
}: CustomerInsightsMacChatPageProps) {
  return <ChatSection sessionId={slug?.[0]} />;
}
