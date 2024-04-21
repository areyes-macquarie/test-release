'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePageParams from '@/hooks/use-stateful-search-params';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  ...props
}: DataTableToolbarProps<TData>) {
  const { pageParams, applyParams } = usePageParams();
  const isFiltered = pageParams.get('name__ilike') !== null;
  const searchInputRef = useRef<HTMLInputElement>(null);

  const setSearchKeyword = useDebouncedCallback((value: string) => {
    if (value.length > 0) {
      pageParams.set('name__ilike', `%${value}%`);
    } else {
      pageParams.delete('name__ilike');
    }
    pageParams.set('page', '1');
    applyParams();
  }, 500);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          ref={searchInputRef}
          placeholder='Search accounts...'
          defaultValue={pageParams.get('name__ilike')?.replaceAll('%', '')}
          onChange={(event) => {
            setSearchKeyword(event.target.value);
          }}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => {
              props.table.resetColumnFilters();
              if (searchInputRef.current) {
                searchInputRef.current.value = '';
                pageParams.delete('name__ilike');
                pageParams.delete('page');
                applyParams();
              }
            }}
            className='h-8 px-2 lg:px-3'
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
