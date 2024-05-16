'use client';

import { PAGE_PARAM_NAME } from '@/components/page/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePageParams from '@/hooks/use-stateful-search-params';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { DataTableViewOptions } from '../../../_components/data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  ...props
}: DataTableToolbarProps<TData>) {
  const { pageParams, push } = usePageParams();
  const isFiltered = pageParams.get('filter') !== null;
  const searchInputRef = useRef<HTMLInputElement>(null);

  const setSearchKeyword = useDebouncedCallback((value: string) => {
    if (value.length > 0) {
      pageParams.set('filter', `${value}`);
    } else {
      pageParams.delete('filter');
    }
    pageParams.set('page', '1');
    push();
  }, 500);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          ref={searchInputRef}
          placeholder='Search contacts...'
          defaultValue={pageParams.get('filter') || ''}
          onChange={(event) => {
            setSearchKeyword(event.target.value);
          }}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='destructive'
            onClick={() => {
              props.table.resetColumnFilters();
              if (searchInputRef.current) {
                searchInputRef.current.value = '';
                pageParams.delete('filter');
                pageParams.delete(PAGE_PARAM_NAME);
                push();
              }
            }}
            className='h-8 px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={props.table} />
    </div>
  );
}
