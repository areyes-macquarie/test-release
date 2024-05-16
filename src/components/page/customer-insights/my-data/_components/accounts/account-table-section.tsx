'use client';

import { DataTable } from '@/components/page/_components/data-table';
import {
  PAGE_PARAM_NAME,
  PAGE_SIZE_PARAM_NAME,
} from '@/components/page/constants';
import { Skeleton } from '@/components/ui/skeleton';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  FollowedContact,
} from '@/lib/customer-insights/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

export function AccountTableSection() {
  const { pageParams, push } = usePageParams();
  const { apiClient, apiReady } = useCustomerInsightsApiClient();

  const [response, setResponse] = useState<ApiCollectionResponse<
    FollowedContact[]
  > | null>();

  useEffect(() => {
    if (!apiReady) return;

    if (pageParams.get('subject')?.toLowerCase() === 'followed') {
      loadFollowedAccounts();
    } else {
      loadManagedAccounts();
    }
  }, [apiReady, pageParams.toString()]);

  function loadManagedAccounts() {
    apiClient
      .getManagedAccounts(`${pageParams.toString()}`)
      .then((res) => {
        toast.dismiss();
        if (!res) {
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
        } else {
          setResponse(res);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error(
          'Something unexpected occured while retrieving managed accounts.'
        );
      });
  }

  function loadFollowedAccounts() {
    apiClient
      .getFollowedAccounts(`${pageParams.toString()}`)
      .then((res) => {
        console.log(res);
        toast.dismiss();
        if (!res) {
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
        } else {
          setResponse(res);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error(
          'Something unexpected occured while retrieving followed accounts.'
        );
      });
  }

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
          per_page:
            Number(pageParams.get(PAGE_SIZE_PARAM_NAME)) < 1
              ? 100
              : Number(pageParams.get(PAGE_SIZE_PARAM_NAME)),
          page: response?.meta.page ?? 0,
        },
        goToPage: (page) => {
          pageParams.set(PAGE_PARAM_NAME, page.toString());
          push();
        },
        setPageSize: (size) => {
          pageParams.set(PAGE_SIZE_PARAM_NAME, size.toString());
          push();
        },
        allowedPageSizes: [10, 50, 100],
      }}
    />
  );
}
