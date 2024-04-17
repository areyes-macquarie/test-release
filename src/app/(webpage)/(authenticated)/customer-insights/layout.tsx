import CustomerInsightsLayout from '@/components/page/customer-insights/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Insights',
  description: 'Customer insights for Macquarie Telecom Group.',
};

export default function CustomerInsightsWebpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CustomerInsightsLayout>{children}</CustomerInsightsLayout>;
}
