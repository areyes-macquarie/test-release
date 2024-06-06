'use client';

import { Badge } from '@/components/ui/badge';
import UserContext from '@/contexts/user/user-context';
import { FollowedContact } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<FollowedContact>;
};

export function ContactNameColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='flex flex-col gap-2 max-w-[400px]'>
      <div className='flex gap-2'>
        <Link
          className='text-wrap font-medium hover:underline underline-offset-2'
          href={`${userContext?.getBasePath()}/customer-insights/contacts/${row.original.base_contact.base_contact_id.toString()}`}
        >
          {!row.original.base_contact.first_name && !row.original.base_contact.first_name
            ? 'UNKNOWN'
            : `${row.original.base_contact.first_name} ${row.original.base_contact.last_name}`}
        </Link>
        {row.original.base_contact.type && row.original.base_contact.type !== 'Active' && (
          <Badge
            variant='outline'
            className='text-xs w-fit hover:underline underline-offset-2 truncate flex gap-2'
          >
            {row.original.base_contact.type}
          </Badge>
        )}
      </div>
      {row.original.base_contact.company && (
        <div className='text-xs text-muted-foreground text-wrap'>
          {row.original.base_contact.company}
        </div>
      )}
    </div>
  );
}
