import { Skeleton } from '@/components/ui/skeleton';

function TagsLoader() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
    </div>
  );
}

export default TagsLoader;
