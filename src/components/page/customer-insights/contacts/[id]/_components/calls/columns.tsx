'use client';

import { DataTableColumnHeader } from '@/components/page/_components/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { ContactCallLog } from '@/lib/customer-insights/types';
import { ColumnDef } from '@tanstack/react-table';
import { PhoneIncomingIcon, PhoneOutgoingIcon, TimerIcon } from 'lucide-react';

export const columns: ColumnDef<ContactCallLog>[] = [
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
          {row.original.call_id}
        </div>
      );
    },
  },
  {
    accessorKey: 'from',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='From' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground flex gap-2'>
          <PhoneOutgoingIcon className='size-4 text-red-500' />
          {row.original.from_}
        </div>
      );
    },
  },
  {
    accessorKey: 'to',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='To' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground flex gap-2'>
          <PhoneIncomingIcon className='size-4 text-green-600' />{' '}
          {row.original.to}
        </div>
      );
    },
  },
  {
    accessorKey: 'start',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant='outline' className='font-light'>
          <span className='max-w-[500px]'>{row.original.start}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: 'duration',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Duration' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground flex gap-1'>
          <TimerIcon className='size-4 text-muted-foreground' />
          {row.original.duration} minutes
        </div>
      );
    },
  },
];
