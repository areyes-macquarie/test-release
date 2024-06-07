'use client';

import UserContext from '@/contexts/user/user-context';
import { FollowedContact } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<FollowedContact>;
};

export function ContactCompanyColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='text-sm text-muted-foreground text-wrap'>
      <Link
        href={`${userContext?.getBasePath()}/customer-insights/accounts/${
          row.original?.base_contact.account_id
        }`}
        id='company'
        className='tracking-normal hover:text-foreground underline underline-offset-2'
      >
        {row.original.base_contact.company}
      </Link>
    </div>
  );
}
