'use client';

import { DataTableColumnHeader } from '@/components/page/_components/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { CrispAccount } from '@/lib/customer-insights/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';
import { AccountIdColumn } from './id-column';
import { AccountNameColumn } from './name-column';

export const columns: ColumnDef<CrispAccount>[] = [
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
      return <AccountIdColumn row={row} />;
    },
  },
  {
    accessorKey: 'name',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account' />
    ),
    cell: ({ row }) => {
      return <AccountNameColumn row={row} />;
    },
  },
  {
    accessorKey: 'homepage',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Homepage' />
    ),
    cell: ({ row }) => {
      return row.original.home_page ? (
        <span className='max-w-[500px] truncate font-light text-xs'>
          {row.original.home_page}
        </span>
      ) : (
        <></>
      );
    },
  },
  {
    accessorKey: 'notes',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Notes' />
    ),
    cell: ({ row }) => {
      return row.original.notes ? (
        <span className='max-w-[500px] truncate font-light text-xs'>
          {row.original.notes}
        </span>
      ) : (
        <></>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
