'use client';

import { getCrispAccountById } from '@/app/test.actions';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import UserContext from '@/contexts/user/user-context';
import { CrispAccount } from '@/lib/customer-insights/types';
import {
  GlobeIcon,
  KeyRound,
  NotepadTextIcon,
  PhoneIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  accountId: string;
};

export function AccountHeader({ ...props }: Props) {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<CrispAccount>();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.isLoggedIn() || !props.accountId) {
      return;
    }

    setLoading(true);
    getCrispAccountById(userContext?.token, props.accountId)
      .then((res) => {
        if (res !== null) {
          setAccount(res);
        }
      })
      .catch(() => {
        toast.error('Something unexpected occured while retrieving account.');
      })
      .finally(() => setLoading(false));
  }, [userContext?.isLoggedIn(), props.accountId]);

  return (
    <div>
      <h2 className='scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight first:mt-0 flex flex-col gap-1'>
        {loading ? (
          <Skeleton className='w-64 h-16' />
        ) : (
          <>
            {account?.name}
            <p className='w-fit tracking-wide text-muted-foreground text-sm font-light'>
              {account?.industry}
            </p>
          </>
        )}

        <div className='space-x-2'>
          <Badge
            variant={'outline'}
            className='w-fit font-light tracking-wide py-1.5 px-3 hover:underline underline-offset-2 text-xs text-muted-foreground'
          >
            <KeyRound className='size-3.5 mr-2' />
            {account?.account_id}
          </Badge>
          {account?.home_page && (
            <Badge
              variant={'outline'}
              className='w-fit font-light tracking-wide py-1.5 px-3 hover:underline underline-offset-2 text-xs text-muted-foreground'
            >
              <GlobeIcon className='size-3.5 mr-2' />
              {account?.home_page}
            </Badge>
          )}
          {account?.phone && (
            <Badge
              variant={'outline'}
              className='w-fit font-light tracking-wide py-1.5 px-3 text-xs text-muted-foreground'
            >
              <PhoneIcon className='size-3.5 mr-2' />
              {account?.phone} {account?.ext ? `(${account.ext})` : ''}
            </Badge>
          )}
          {account?.num_of_employees && (
            <Badge
              variant={'outline'}
              className='w-fit font-light tracking-wide py-1.5 px-3 text-xs text-muted-foreground'
            >
              <UsersRoundIcon className='size-3.5 mr-2' />
              {account?.num_of_employees ?? 0}
            </Badge>
          )}
          {account?.notes && (
            <Badge
              variant={'outline'}
              className='w-fit font-light tracking-wide py-1.5 px-3 text-xs text-muted-foreground'
            >
              <NotepadTextIcon className='size-3.5 mr-2' />
              {account?.notes}
            </Badge>
          )}
        </div>
      </h2>
    </div>
  );
}
