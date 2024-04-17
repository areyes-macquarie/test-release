import { Metadata } from 'next';

import { Sidebar } from './_components/sidebar';

export const metadata: Metadata = {
  title: 'Customer Insights',
  description: 'Customer insights for Macquarie Telecom Group.',
};

export default function CustomerInsightsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid lg:grid-cols-6 flex-grow'>
      <Sidebar className='hidden lg:block' />
      <div className='col-span-4 lg:col-span-5 lg:border-l'>{children}</div>
    </div>
  );
}
