import CustomerInsightsLayout from '@/components/page/customer-insights/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Insights',
  description: 'Customer insights for Macquarie Technology Group.',
};

type Props = {
  children: React.ReactNode;
};

export default function CustomerInsightsTabLayout({
  children,
}: Readonly<Props>) {
  return <CustomerInsightsLayout>{children}</CustomerInsightsLayout>;
}
