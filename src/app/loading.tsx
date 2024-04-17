import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <div className='h-full container gap-4 py-8 flex flex-col'>
      <Skeleton className='h-28 w-full' />
      <Skeleton className='h-28 w-full' />
      <Skeleton className='h-64 w-full' />
    </div>
  );
}
