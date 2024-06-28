import LoadingPage from '@/app/loading';
import CustomerInsightsMacChatPage from '@/components/page/customer-insights/mac-chat';
import { Suspense } from 'react';

export default function CustomerInsightsMacChatWebsite({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsMacChatPage {...params} />
    </Suspense>
  );
}
