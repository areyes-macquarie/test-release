import LoadingPage from '@/app/loading';
import CustomerInsightsAccountsPage from '@/components/page/customer-insights/accounts';
import { Suspense } from 'react';

export default function CustomerInsightsAccountsTab() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsAccountsPage />
    </Suspense>
  );
}
