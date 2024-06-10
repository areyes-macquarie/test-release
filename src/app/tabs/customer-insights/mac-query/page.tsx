import LoadingPage from '@/app/loading';
import CustomerInsightsMacQueryPage from '@/components/page/customer-insights/mac-query';
import { Suspense } from 'react';

export default function CustomerInsightsMacQueryTab() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsMacQueryPage />
    </Suspense>
  );
}
