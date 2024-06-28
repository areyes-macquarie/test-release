'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Session } from '@/lib/customer-insights/types';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { DeleteDialog } from '../dialog/delete-dialog';

type OptionsButtonProps = {
  session: Session;
};

function OptionsButton({ session }: OptionsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'group-hover:opacity-100 ghost',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
        >
          <DotsHorizontalIcon className='h-4 w-4' />
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-auto'>
        <DeleteDialog
          session={session}
          onOpenChange={(open) => !open && setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default OptionsButton;
