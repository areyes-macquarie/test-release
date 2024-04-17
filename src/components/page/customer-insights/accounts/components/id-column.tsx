'use client';

import UserContext from '@/contexts/user/user-context';
import { CrispAccount } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<CrispAccount>;
};

export function AccountIdColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='w-fit'>
      <Link
        className='text-wrap font-light hover:underline underline-offset-2 text-xs'
        href={`${
          userContext?.basePath
        }/customer-insights/accounts/${row.original.account_id.toString()}`}
      >
        {row.original.account_id}
      </Link>
    </div>
  );
}
