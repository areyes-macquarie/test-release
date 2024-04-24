'use client';

import { DataTable } from '@/components/page/_components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import {
  ApiCollectionResponse,
  CrispContact,
} from '@/lib/customer-insights/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

type Props = {
  baseContactId: number;
};

export function HistoryTableSection({ ...props }: Props) {
  const [page, setPage] = useState('1');
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const [response, setResponse] = useState<ApiCollectionResponse<
    CrispContact[]
  > | null>();

  useEffect(() => {
    if (!apiReady) return;

    toast.message('Please wait...');

    apiClient
      .getCrispContacts(
        `ordering=-change_dt&base_contact_id=${props.baseContactId}&page=${page}`
      )
      .then((res) => {
        setResponse(res);
        toast.dismiss();
      })
      .catch(() =>
        toast.error(
          'Something unexpected occured while retrieving contact events.'
        )
      );
  }, [apiReady, page]);

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
          setPage(page.toString());
        },
        setPageSize: () => {
          // Do nothing
        },
        allowedPageSizes: [20],
      }}
    />
  );
}
