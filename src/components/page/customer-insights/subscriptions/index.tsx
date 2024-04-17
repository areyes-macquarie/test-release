import { Separator } from '@/components/ui/separator';

export default function CustomerInsightsSubscriptionsPage() {
  return (
    <div className='h-full px-4 pt-6 pb-12 lg:px-8 relative space-y-4'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              Subscriptions
            </h2>
            <p className='text-sm text-muted-foreground'>
              Search for subscriptions.
            </p>
          </div>
        </div>
        <Separator className='my-4' />
      </div>

      <div className='relative'>
        <p>Nothing to see here yet...</p>
      </div>
    </div>
  );
}
