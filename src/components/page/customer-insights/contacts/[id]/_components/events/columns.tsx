'use client';

import { DataTableColumnHeader } from '@/components/page/_components/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { ContactEvent } from '@/lib/customer-insights/types';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { ClockIcon } from 'lucide-react';

export const columns: ColumnDef<ContactEvent>[] = [
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
          {row.original.event_id}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant='outline' className='font-light'>
          {row.original.type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'event',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Event' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-wrap flex gap-1'>
          <ClockIcon className='size-4 text-muted-foreground' />
          {row.original.event}
        </div>
      );
    },
  },
  {
    accessorKey: 'time',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Time' />
    ),
    cell: ({ row }) => {
      return !row.original.datetime ? (
        <></>
      ) : (
        <Badge variant='outline' className='font-light'>
          <span className='max-w-[500px]'>
            {formatDistanceToNow(new Date(row.original.datetime), {
              addSuffix: true,
            })}
          </span>
        </Badge>
      );
    },
  },
];
