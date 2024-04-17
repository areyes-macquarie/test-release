'use client';

import UserContext from '@/contexts/user/user-context';
import { CrispContact } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<CrispContact>;
};

export function ContactCompanyColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='text-sm text-muted-foreground text-wrap'>
      <Link
        href={`${userContext?.basePath}/customer-insights/accounts/${row.original?.account_id}`}
        id='company'
        className='tracking-normal hover:text-foreground hover:underline underline-offset-2'
      >
        {row.original.company}
      </Link>
    </div>
  );
}
