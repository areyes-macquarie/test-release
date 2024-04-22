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

type Props = {
  accountId: string;
};

export function TableSection({ ...props }: Props) {
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const { pageParams, applyParams } = usePageParams();
  const [response, setResponse] = useState<
    ApiCollectionResponse<CrispContact[]> | null | undefined
  >();

  useEffect(() => {
    if (!apiReady || !props.accountId) {
      return;
    }

    toast.message('Please wait...');
    apiClient
      .getCrispContacts(
        `account_id=${
          props.accountId
        }&ordering=-change_dt&${pageParams.toString()}`
      )
      .then((res) => {
        if (res !== null) {
          setResponse(res);
        }
        toast.dismiss();
      })
      .catch(() => {
        toast.error('Something unexpected occured while retrieving contacts.');
      });
  }, [apiReady, props.accountId, pageParams.toString()]);

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
          alert(pageParams.toString());
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
