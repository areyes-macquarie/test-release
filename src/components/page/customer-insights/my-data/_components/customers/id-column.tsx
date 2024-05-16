'use client';

import UserContext from '@/contexts/user/user-context';
import { FollowedContact } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<FollowedContact>;
};

export function ContactIdColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='w-fit'>
      <Link
        className='text-wrap font-light hover:underline underline-offset-2 text-xs'
        href={`${userContext?.getBasePath()}/customer-insights/contacts/${row.original.base_contact_id.toString()}`}
      >
        {row.original.account_contact_id}
      </Link>
    </div>
  );
}
