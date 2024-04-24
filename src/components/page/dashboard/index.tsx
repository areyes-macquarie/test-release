import { Metadata } from 'next';
import { GlobalMetric } from '../_components/global-metric';

export const metadata: Metadata = {
  title: 'Dashboard - MTG',
  description: 'Macquarie Technology Group.',
};

export default function DashboardPage() {
  return (
    <>
      <div className='min-h-full px-4 py-6 lg:px-8'>
        <GlobalMetric />
      </div>
    </>
  );
}
