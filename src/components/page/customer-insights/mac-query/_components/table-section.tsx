'use client';

import { DataTable } from '@/components/page/_components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  QueryResultAccount,
} from '@/lib/customer-insights/types';
import { isEmpty } from '@/services/shared/helpers';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import EMPTY_QUERY from '../empty-query.json';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

export function TableSection() {
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const { pageParams, push } = usePageParams();
  const [response, setResponse] = useState<ApiCollectionResponse<
    QueryResultAccount[]
  > | null>();

  useEffect(() => {
    if (!apiReady) return;

    if (isEmpty(pageParams.get('query'))) {
      setResponse(EMPTY_QUERY);
      return;
    }

    toast.message('Processing query, please wait...');

    apiClient
      .getEngineQuery(pageParams.toString())
      .then((res) => {
        setResponse(res);
        toast.dismiss();
      })
      .catch(() => {
        toast.dismiss();
        toast.error(
          'Something unexpected occured while processing your query.'
        );
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
