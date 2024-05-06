'use client';

import { DataTable } from '@/components/page/_components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import UserContext from '@/contexts/user/user-context';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  ContactSubscription,
} from '@/lib/customer-insights/types';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

export function TableSection() {
  const userContext = useContext(UserContext);
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const { pageParams, applyParams } = usePageParams();

  const [subscriptionResponse, setSubscriptionResponse] =
    useState<ApiCollectionResponse<ContactSubscription[]> | null>();

  /**
   * Retrieve subscriptions
   */
  useEffect(() => {
    if (!apiReady) return;

    toast.message('Please wait...');

    apiClient
      .getContactSubscriptions(
        `${pageParams.toString()}`
      )
      .then((res) => {
        toast.dismiss();
        if (!res) {
          setSubscriptionResponse({
            meta: {
              count: 0,
              model: '',
              next: '',
              page: 1,
              previous: '',
            },
            objects: [],
          });
        } else {
          setSubscriptionResponse(res);
        }
      })
      .catch(() =>
        toast.error(
          'Something unexpected occured while retrieving contact subscription.'
        )
      );
  }, [apiReady, pageParams.toString()]);

  return subscriptionResponse === undefined ? (
    <div className='space-y-4'>
      <Skeleton className='w-64 h-8' />
      <Skeleton className='w-full h-48' />
    </div>
  ) : (
    <DataTable
      data={subscriptionResponse?.objects ?? []}
      columns={columns}
      Toolbar={DataTableToolbar}
      pagination={{
        totalRecords: subscriptionResponse?.meta.count ?? 0,
        pagingState: {
          per_page: 20,
          page: subscriptionResponse?.meta.page ?? 0,
        },
        goToPage: (page) => {
          pageParams.set('page', page.toString());
          applyParams();
        },
        setPageSize: () => {
          // Do nothing
        },
        allowedPageSizes: [20],
      }}
    />
  );
}
