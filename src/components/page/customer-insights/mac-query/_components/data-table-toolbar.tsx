'use client';

import { PAGE_PARAM_NAME } from '@/components/page/constants';
import { VoiceCommand } from '@/components/shared/voice-command';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePageParams from '@/hooks/use-stateful-search-params';
import isEmpty from '@/services/shared/helpers/is-empty';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  ...props
}: DataTableToolbarProps<TData>) {
  const { pageParams, push } = usePageParams();
  const isFiltered = pageParams.get('query') !== null;
  const searchInputRef = useRef<HTMLInputElement>(null);

  const setSearchKeyword = useDebouncedCallback((value: string) => {
    if (value.length > 0) {
      pageParams.set('query', `${value}`);
    } else {
      pageParams.delete('query');
    }
    pageParams.set('page', '1');
    push();
  }, 1000);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <VoiceCommand
          commandUpdated={(value) => {
            if (!searchInputRef.current || isEmpty(value)) {
              return;
            }

            searchInputRef.current.value = value;
            searchInputRef.current.focus();
            setSearchKeyword(value);
          }}
        />
        <Input
          ref={searchInputRef}
          placeholder='Type your query here...'
          defaultValue={pageParams.get('query') || ''}
          onChange={(event) => {
            setSearchKeyword(event.target.value);
          }}
          className='h-8 w-full max-w-2xl'
        />
        {isFiltered && (
          <Button
            variant='destructive'
            onClick={() => {
              props.table.resetColumnFilters();
              if (searchInputRef.current) {
                searchInputRef.current.value = '';
                pageParams.delete('query');
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
    </div>
  );
}
