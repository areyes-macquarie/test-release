import { AccountMetric } from '@/components/page/_components/account-metric';
import { AccountHeader } from './components/account-header';
import { TableSection } from './components/table-section';

type Props = {
  id: string;
};

export default function CustomerInsightsAccountDetailsPage({
  ...props
}: Props) {
  return (
    <div className='h-full px-4 pt-6 pb-12 lg:px-8 space-y-6'>
      <AccountHeader accountId={props.id} />
      <div>
        <AccountMetric accountId={props.id} />
      </div>
      <div className='flex flex-col space-y-1'>
        <TableSection accountId={props.id} />
      </div>
    </div>
  );
}
