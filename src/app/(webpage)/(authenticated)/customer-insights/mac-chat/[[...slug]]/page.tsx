'use client';
import LoadingPage from '@/app/loading';
import CustomerInsightsMacChatPage from '@/components/page/customer-insights/mac-chat';
import { Suspense, useEffect } from 'react';

export default function CustomerInsightsMacChatWebsite({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  useEffect(() => {
    console.log('will mount chat page');

    return () => {
      console.log('will unount');
    };
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsMacChatPage {...params} />
    </Suspense>
  );
}
