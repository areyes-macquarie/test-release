import LoadingPage from '@/app/loading';
import CustomerInsightsAccountDetailsPage from '@/components/page/customer-insights/accounts/[id]';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
};

export default function CustomerInsightsAccountDetailsWebsite({
  params,
}: Props) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsAccountDetailsPage id={params.id} />
    </Suspense>
  );
}
