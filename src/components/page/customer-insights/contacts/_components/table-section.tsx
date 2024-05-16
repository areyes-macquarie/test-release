'use client';

import { DataTable } from '@/components/page/_components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  CrispContact,
} from '@/lib/customer-insights/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

export function TableSection() {
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const { pageParams, push } = usePageParams();
  const [response, setResponse] = useState<ApiCollectionResponse<
    CrispContact[]
  > | null>();

  useEffect(() => {
    if (!apiReady) return;

    toast.message('Loading contacts...');
    apiClient
      .getCrispContacts(`${pageParams.toString()}`)
      .then((res) => {
        setResponse(res);
        toast.dismiss();
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Something unexpected occured while retrieving contacts.');
      });
  }, [apiReady, pageParams.toString()]);

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
            Number(pageParams.get('count')) < 1
              ? 100
              : Number(pageParams.get('count')),
          page: response?.meta.page ?? 0,
        },
        goToPage: (page) => {
          pageParams.set('page', page.toString());
          push();
        },
        setPageSize: (size) => {
          pageParams.set('count', size.toString());
          push();
        },
        allowedPageSizes: [10, 50, 100],
      }}
    />
  );
}
