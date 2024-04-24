'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserContext from '@/contexts/user/user-context';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import usePageParams from '@/hooks/use-stateful-search-params';
import { CrispContact } from '@/lib/customer-insights/types';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { applyParams, pageParams } = usePageParams();
  const [loading, setLoading] = useState(false);
  const { apiClient } = useCustomerInsightsApiClient();
  const userContext = useContext(UserContext);
  const contact = row.original as CrispContact & { subscription_id: number };

  function unsubscribe(subscriptionId: number) {
    if (!userContext?.isLoggedIn() || loading) {
      return;
    }

    setLoading(true);
    apiClient
      .unsubscribeToContact({
        subscriptionId,
      })
      .then(() => {
        pageParams.set('refresh_on', Date.now().toString());
        applyParams();
        toast.success('Successfully unsubscribed from contact.');
      })
      .catch(() => {
        toast.error(
          'Sorry, unable to unsubscribe from contact at this moment.'
        );
      })
      .finally(() => setLoading(false));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem>
          <Link
            href={`${userContext?.getBasePath()}/customer-insights/contacts/${contact.account_contact_id.toString()}`}
          >
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => unsubscribe(contact.subscription_id)}>
          Unsubscribe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
