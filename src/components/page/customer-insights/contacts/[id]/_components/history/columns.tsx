'use client';

import { DataTableColumnHeader } from '@/components/page/_components/data-table-column-header';
import { CrispContact } from '@/lib/customer-insights/types';
import { ColumnDef } from '@tanstack/react-table';
import { Building2Icon, UserRoundIcon } from 'lucide-react';

export const columns: ColumnDef<CrispContact>[] = [
  {
    accessorKey: 'id',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground text-wrap'>
          {row.original.account_contact_id}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground flex gap-2'>
          <UserRoundIcon className='size-4 text-muted-foreground' />
          {row.original.first_name} {row.original.last_name}
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
      return (
        <div className='text-xs text-wrap flex gap-2'>
          <Building2Icon className='size-4 text-muted-foreground' />
          {row.original.company}
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground text-wrap'>
          {row.original.email}
        </div>
      );
    },
  },
];
