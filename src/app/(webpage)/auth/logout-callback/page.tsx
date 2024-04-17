'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// TODO: Do the logout process for Single Sign Out
export default function SingleSignoutPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

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
