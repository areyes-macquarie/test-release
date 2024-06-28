'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import useSessions from '@/hooks/use-sessions';
import { Session } from '@/lib/customer-insights/types';
import { DialogProps } from '@radix-ui/react-dialog';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type DeleteDialogProps = DialogProps & {
  session: Session;
};

export function DeleteDialog({ onOpenChange, session }: DeleteDialogProps) {
  const { apiClient } = useCustomerInsightsApiClient();
  const { removeSession } = useSessions();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnOpenChange = (value: boolean) => {
    console.log(value);
    setOpen(!open);
    onOpenChange && onOpenChange(value);
  };
  const onDelete = async () => {
    setLoading(true);
    await apiClient.deleteChatSession(session.session_id);
    removeSession(session.session_id);
    setOpen(false);
    setLoading(true);
  };
  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-red-600 hover:text-red-600'>
          <Trash2Icon className='w-4 h-4 mr-2' />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent hideXButton className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete Chat?</DialogTitle>
        </DialogHeader>
        <div>
          This will delete{' '}
          <div className='inline font-bold text-white'>
            {session.session_name}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='secondary' disabled={loading}>
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={onDelete}
            type='submit'
            variant='destructive'
            disabled={loading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
