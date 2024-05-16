'use client';

import { DataTableViewOptions } from '@/components/page/_components/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onSearch?: (_searchKeyword: string) => void;
}

export function DataTableToolbar<TData>({
  ...props
}: DataTableToolbarProps<TData>) {
  const [search, setSearch] = useState<string>('');
  const isFiltered = search !== '';
  const searchInputRef = useRef<HTMLInputElement>(null);

  const setSearchKeyword = useDebouncedCallback((value: string) => {
    if (value.length > 0) {
      setSearch(value);
    } else {
      setSearch('');
    }
  }, 500);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          ref={searchInputRef}
          placeholder='Search events...'
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
                setSearch('');
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
