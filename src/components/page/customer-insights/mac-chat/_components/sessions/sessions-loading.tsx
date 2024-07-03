import { Skeleton } from '@/components/ui/skeleton';

function SessionLoading() {
  return (
    <div className='w-full flex flex-col gap-3'>
      <Skeleton className='h-[40px] w-auto' />
      <Skeleton className='h-[40px] w-auto' />
      <Skeleton className='h-[40px] w-auto' />
      <Skeleton className='h-[40px] w-auto' />
      <Skeleton className='h-[40px] w-auto' />
      <Skeleton className='h-[40px] w-auto' />
    </div>
  );
}

export default SessionLoading;
