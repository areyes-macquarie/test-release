import LoadingPage from '@/app/loading';
import CustomerInsightsMacQueryPage from '@/components/page/customer-insights/mac-query';
import { Suspense } from 'react';

export default function CustomerInsightsMacQuerysWebsite() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsMacQueryPage />
    </Suspense>
  );
}
