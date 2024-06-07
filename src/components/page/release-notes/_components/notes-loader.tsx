import { Skeleton } from '@/components/ui/skeleton';

function NotesLoader() {
  return (
    <div className='flex flex-col gap-8 w-full'>
      <Skeleton className='h-56 w-full' />
      <Skeleton className='h-56 w-full' />
    </div>
  );
}

export default NotesLoader;
