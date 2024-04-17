import LoadingPage from '@/app/loading';
import CustomerInsightsContactsPage from '@/components/page/customer-insights/contacts';
import { Suspense } from 'react';

export default function CustomerInsightsContactsTab() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsContactsPage />
    </Suspense>
  );
}
