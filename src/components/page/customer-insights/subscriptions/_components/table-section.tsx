'use client';

import { DataTable } from '@/components/page/_components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import UserContext from '@/contexts/user/user-context';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  ContactSubscription,
  CrispContact,
} from '@/lib/customer-insights/types';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

export function TableSection() {
  const userContext = useContext(UserContext);
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const { pageParams, applyParams } = usePageParams();
  const [response, setResponse] = useState<ApiCollectionResponse<
    (CrispContact & { subscription_id: number })[]
  > | null>();

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
        `user_id=${userContext?.id}&${pageParams.toString()}`
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

  /**
   * Retrieve contacts list based on subscriptions
   */
  useEffect(() => {
    if (!subscriptionResponse) {
      setResponse(undefined);
    }

    const baseContactIds =
      subscriptionResponse?.objects.map((row) => row.base_contact_id) ?? [];

    if (baseContactIds.length < 1) {
      setResponse({
        meta: {
          count: 0,
          model: '',
          next: '',
          page: 1,
          previous: '',
        },
        objects: [],
      });

      return;
    }

    apiClient
      .getCrispContacts(
        `ordering=-change_dt&base_contact_id__in=${baseContactIds?.join()}&${pageParams.toString()}`
      )
      .then((res) => {
        if (res !== null) {
          const objects = res.objects.map((obj) => ({
            ...obj,
            subscription_id:
              subscriptionResponse?.objects.find(
                (row) => row.base_contact_id === obj.base_contact_id
              )?.subscription_id ?? 0,
          }));
          setResponse({
            meta: res.meta,
            objects: objects,
          });
          toast.dismiss();
        }
      })
      .catch(() =>
        toast.error('Something unexpected occured while retrieving contacts.')
      );
  }, [subscriptionResponse]);

  return response === undefined ? (
    <div className='space-y-4'>
      <Skeleton className='w-64 h-8' />
      <Skeleton className='w-full h-48' />
    </div>
  ) : (
    <DataTable
      data={response?.objects ?? []}
      columns={columns}
      Toolbar={DataTableToolbar}
      pagination={{
        totalRecords: response?.meta.count ?? 0,
        pagingState: {
          per_page: 20,
          page: response?.meta.page ?? 0,
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
