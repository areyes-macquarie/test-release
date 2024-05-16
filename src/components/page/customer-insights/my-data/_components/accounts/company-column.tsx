'use client';

import UserContext from '@/contexts/user/user-context';
import { FollowedAccount } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<FollowedAccount>;
};

export function ContactCompanyColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='text-sm text-muted-foreground text-wrap'>
      <Link
        href={`${userContext?.getBasePath()}/customer-insights/accounts/${
          row.original?.account_id
        }`}
        id='company'
        className='tracking-normal hover:text-foreground underline underline-offset-2'
      >
        {row.original.company}
      </Link>
    </div>
  );
}
