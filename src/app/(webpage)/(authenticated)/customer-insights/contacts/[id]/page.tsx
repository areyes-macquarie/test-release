import LoadingPage from '@/app/loading';
import CustomerInsightsContactDetailsPage from '@/components/page/customer-insights/contacts/[id]';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
};

export default function CustomerInsightsContactsDetailsWebsite({
  params,
}: Props) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsContactDetailsPage id={params.id} />
    </Suspense>
  );
}
