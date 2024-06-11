'use client';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import { CrispAccount } from '@/lib/customer-insights/types';
import {
  GlobeIcon,
  KeyRound,
  NotepadTextIcon,
  PhoneIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  accountId: string;
};

// TODO:  Convert to Link if there is account?.home_page

export function AccountHeader({ ...props }: Props) {
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<CrispAccount>();

  useEffect(() => {
    if (!apiReady || !props.accountId) {
      return;
    }

    setLoading(true);
    apiClient
      .getCrispAccountById(props.accountId)
      .then((res) => {
        if (res !== null) {
          setAccount(res);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Something unexpected occured while retrieving account.');
      })
      .finally(() => setLoading(false));
  }, [apiReady, props.accountId]);

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
