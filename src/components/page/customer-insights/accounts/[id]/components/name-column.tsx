'use client';

import { Badge } from '@/components/ui/badge';
import UserContext from '@/contexts/user/user-context';
import { CrispContact } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<CrispContact>;
};

export function ContactNameColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='flex flex-col gap-2 max-w-[400px]'>
      <div className='flex gap-2'>
        <Link
          className='text-wrap font-medium hover:underline underline-offset-2'
          href={`${
            userContext?.basePath
          }/customer-insights/contacts/${row.original.account_contact_id.toString()}`}
        >
          {!row.original.first_name && !row.original.first_name
            ? 'UNKNOWN'
            : `${row.original.first_name} ${row.original.last_name}`}
        </Link>
        {row.original.type && row.original.type !== 'Active' && (
          <Badge
            variant='outline'
            className='text-xs w-fit hover:underline underline-offset-2 truncate flex gap-2'
          >
            {row.original.type}
          </Badge>
        )}
      </div>
      {row.original.email && (
        <div className='text-xs text-muted-foreground text-wrap'>
          {row.original.email}
        </div>
      )}
    </div>
  );
}
