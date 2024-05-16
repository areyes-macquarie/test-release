'use client';

import { DataTable } from '@/components/page/_components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import {
  ApiCollectionResponse,
  ContactEvent,
} from '@/lib/customer-insights/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

type Props = {
  baseContactId: number;
};

export function EventsTableSection({ ...props }: Props) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const [response, setResponse] = useState<ApiCollectionResponse<
    ContactEvent[]
  > | null>();

  useEffect(() => {
    if (!apiReady) return;

    toast.message('Loading contact events...');

    apiClient
      .getCrispContactEvents(
        `ordering=-time&base_contact_id=${props.baseContactId}&page=${page}&count=${perPage}`
      )
      .then((res) => {
        setResponse(res);
        toast.dismiss();
      })
      .catch(() => {
        toast.dismiss();
        toast.error(
          'Something unexpected occured while retrieving contact events.'
        );
      });
  }, [apiReady, page, perPage]);

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
          per_page: perPage,
          page: response?.meta.page ?? 0,
        },
        goToPage: (page) => {
          setPage(page);
        },
        setPageSize: (size) => {
          setPerPage(size);
        },
        allowedPageSizes: [10, 50, 100],
      }}
    />
  );
}
