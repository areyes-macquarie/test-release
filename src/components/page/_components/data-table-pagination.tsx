'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { useEffect } from 'react';

export type PagingState = {
  per_page: number;
  page: number;
};

export type PaginationProps = {
  totalRecords: number;
  pagingState: PagingState;
  goToPage?: (_page: number) => void;
  setPageSize?: (_pageSize: number) => void;
  allowedPageSizes?: number[];
};

export function DataTablePagination({ ...props }: PaginationProps) {
  const pageSizes: number[] = props.allowedPageSizes ?? [20];
  const totalPages = Math.ceil(props.totalRecords / props.pagingState.per_page);
  const canGoBack = props.pagingState.page > 1;
  const canGoNext = props.pagingState.page < totalPages;
  const { page, per_page } = props.pagingState;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (totalPages === 0) {
      return;
    }

    // Don't allow current page to be more than total page
    if (totalPages < page) {
      props.goToPage?.(1);
    }

    if (!pageSizes.includes(per_page)) {
      props.setPageSize?.(pageSizes[0]);
    }
  }, [totalPages, page, per_page]);

  if (totalPages <= 0) {
    return <></>;
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col w-full gap-3 items-center'>
        <div className='flex w-full justify-center relative'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => props.goToPage?.(1)}
              disabled={!canGoBack}
            >
              <span className='sr-only'>Go to first page</span>
              <DoubleArrowLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() =>
                props.goToPage?.(Math.max(props.pagingState.page - 1, 0))
              }
              disabled={!canGoBack}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() =>
                props.goToPage?.(Math.max(props.pagingState.page + 1, 0))
              }
              disabled={!canGoNext}
            >
              <span className='sr-only'>Go to next page</span>
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => props.goToPage?.(totalPages)}
              disabled={!canGoNext}
            >
              <span className='sr-only'>Go to last page</span>
              <DoubleArrowRightIcon className='h-4 w-4' />
            </Button>
          </div>

          {props.allowedPageSizes && props.allowedPageSizes?.length > 1 && (
            <div className='flex gap-2 items-center absolute right-0'>
              <p className='text-sm font-medium hidden sm:inline'>Show</p>
              <Select
                value={`${props.pagingState.per_page}`}
                onValueChange={(value) => {
                  props.setPageSize?.(Number(value));
                }}
              >
                <SelectTrigger className='h-8 w-[70px]'>
                  <SelectValue placeholder={props.pagingState.per_page} />
                </SelectTrigger>
                <SelectContent side='top'>
                  {pageSizes.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className='flex w-[400px] items-center justify-center text-sm font-medium'>
          {props.pagingState.page} of {totalPages}
        </div>
      </div>
    </div>
  );
}
