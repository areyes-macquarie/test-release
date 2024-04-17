import LoadingPage from '@/app/loading';
import CustomerInsightsContactsPage from '@/components/page/customer-insights/contacts';
import { Suspense } from 'react';

export default function CustomerInsightsContactsWebsite() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsContactsPage />
    </Suspense>
  );
}
