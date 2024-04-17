import { Separator } from '@/components/ui/separator';
import { GlobalMetric } from '../../_components/global-metric';
import { TableSection } from './components/table-section';

export default function CustomerInsightsAccountsPage() {
  return (
    <div className='h-full px-4 pt-6 pb-12 lg:px-8 relative space-y-4'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>Accounts</h2>
            <p className='text-sm text-muted-foreground'>
              Search for accounts.
            </p>
          </div>
        </div>
        <Separator className='my-4' />
        <GlobalMetric hideContacts />
      </div>

      <div className='relative'>
        <TableSection />
      </div>
    </div>
  );
}
