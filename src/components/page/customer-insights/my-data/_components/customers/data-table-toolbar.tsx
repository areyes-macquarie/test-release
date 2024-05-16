'use client';

import { DataTableViewOptions } from '@/components/page/_components/data-table-view-options';
import { PAGE_PARAM_NAME } from '@/components/page/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import usePageParams from '@/hooks/use-stateful-search-params';
import { hasValue } from '@/services/shared/helpers';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { HeartIcon, Link2Icon } from 'lucide-react';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const SEARCH_KEYWORD_PARAM_NAME = 'filter';
const SUBJECT_PARAM_NAME = 'subject';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onSearchKeywordChange?: (_searchKeyword: string) => void;
}

export function DataTableToolbar<TData>({
  ...props
}: DataTableToolbarProps<TData>) {
  const { pageParams, push } = usePageParams();

  const isFiltered = hasValue(pageParams.get(SEARCH_KEYWORD_PARAM_NAME));
  const searchInputRef = useRef<HTMLInputElement>(null);

  const setSearchKeyword = useDebouncedCallback((value: string) => {
    hasValue(value)
      ? pageParams.set(SEARCH_KEYWORD_PARAM_NAME, value)
      : pageParams.delete(SEARCH_KEYWORD_PARAM_NAME);
    pageParams.delete(PAGE_PARAM_NAME);
    push();
  }, 500);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          ref={searchInputRef}
          placeholder='Search customers...'
          defaultValue={pageParams.get(SEARCH_KEYWORD_PARAM_NAME) ?? ''}
          onChange={(event) => {
            setSearchKeyword(event.target.value);
          }}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div>
          <Select
            onValueChange={(value) => {
              pageParams.delete(PAGE_PARAM_NAME);
              pageParams.delete(SEARCH_KEYWORD_PARAM_NAME);
              pageParams.set(SUBJECT_PARAM_NAME, value);
              push();
            }}
            value={
              pageParams.get(SUBJECT_PARAM_NAME)?.toLowerCase() === 'followed'
                ? 'followed'
                : 'managed'
            }
          >
            <SelectTrigger className='w-[150px] h-8'>
              <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='managed'>
                  <div className='flex gap-2'>
                    <Link2Icon className='size-4 my-auto' /> Managed
                  </div>
                </SelectItem>
                <SelectItem value='followed'>
                  <div className='flex gap-2'>
                    <HeartIcon className='size-4 my-auto' /> Followed
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {isFiltered && (
          <Button
            variant='destructive'
            onClick={() => {
              if (searchInputRef.current) {
                searchInputRef.current.value = '';
              }
              pageParams.delete(SEARCH_KEYWORD_PARAM_NAME);
              push();
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
