'use client';

import { getCrispContacts } from '@/app/test.actions';
import { DataTable } from '@/components/page/_components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import UserContext from '@/contexts/user/user-context';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  CrispContact,
} from '@/lib/customer-insights/types';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

export function TableSection() {
  const userContext = useContext(UserContext);
  const { pageParams, applyParams } = usePageParams();
  const [response, setResponse] = useState<ApiCollectionResponse<
    CrispContact[]
  > | null>();

  useEffect(() => {
    if (!userContext?.isLoggedIn()) return;

    toast.message('Please wait...');
    getCrispContacts(
      userContext?.token,
      `ordering=-change_dt&${pageParams.toString()}`
    )
      .then((res) => {
        setResponse(res);
        toast.dismiss();
      })
      .catch(() =>
        toast.error('Something unexpected occured while retrieving contacts.')
      );
  }, [userContext?.isLoggedIn(), pageParams.toString()]);

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
