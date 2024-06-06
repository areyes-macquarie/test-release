'use client';

import UserContext from '@/contexts/user/user-context';
import { FollowedAccount } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<FollowedAccount>;
};

export function AccountIdColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='w-fit'>
      <Link
        className='text-wrap font-light underline underline-offset-2 text-xs'
        href={`${userContext?.getBasePath()}/customer-insights/accounts/${row.original.account.account_id.toString()}`}
      >
        {row.original.account.account_id}
      </Link>
    </div>
  );
}
