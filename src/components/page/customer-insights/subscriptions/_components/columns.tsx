'use client';

import { DataTableColumnHeader } from '@/components/page/_components/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CrispContact } from '@/lib/customer-insights/types';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { CheckIcon } from 'lucide-react';
import { ContactCompanyColumn } from './company-column';
import { DataTableRowActions } from './data-table-row-actions';
import { ContactIdColumn } from './id-column';
import { ContactNameColumn } from './name-column';

export const columns: ColumnDef<CrispContact>[] = [
  {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
  },
  {
    accessorKey: 'id',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => {
      return <ContactIdColumn row={row} />;
    },
  },
  {
    accessorKey: 'name',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return <ContactNameColumn row={row} />;
    },
  },
  {
    accessorKey: 'position',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground text-wrap'>
          {row.original.position}
        </div>
      );
    },
  },
  {
    accessorKey: 'company',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Company' />
    ),
    cell: ({ row }) => {
      return <ContactCompanyColumn row={row} />;
    },
  },
  {
    accessorKey: 'updated',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Updated' />
    ),
    cell: ({ row }) => {
      const now = new Date();
      const lastUpdate = new Date(row.original.change_dt);
      const yearInMs = 1000 * 60 * 60 * 24 * 365;
      const isStale = Number(now) - Number(lastUpdate) >= yearInMs;

      return !row.original.change_dt ? (
        <></>
      ) : (
        <Badge
          variant='outline'
          className={cn('font-light', isStale ? 'text-orange-400' : '')}
        >
          <span className='max-w-[500px] truncate'>
            {formatDistanceToNow(new Date(row.original.change_dt), {
              addSuffix: true,
            })}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: 'active',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Active' />
    ),
    cell: ({ row }) => {
      return row.original.active ? <CheckIcon className='size-4' /> : <></>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
