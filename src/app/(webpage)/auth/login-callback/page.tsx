import { Loader2 } from 'lucide-react';

export default function LoginCallback() {
  return (
    <div className='flex'>
      <div className='mx-auto min-h-[420px] py-28 text-center px-6'>
        <h2 className='text-3xl font-bold'>Redirecting...</h2>
        <p className='text-base text-muted-foreground'>
          Please wait while we redirect you...
        </p>
        <Loader2 className='mx-auto my-4 h-6 w-6 animate-spin' />
      </div>
    </div>
  );
}
