'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string;
};

export function NavBackButton({ ...props }: Props) {
  const router = useRouter();

  return (
    <Button
      variant='outline'
      className={cn('rounded-full size-12 my-auto', props.className)}
      onClick={() => router.back()}
    >
      <MoveLeftIcon className='size-6' />
    </Button>
  );
}
