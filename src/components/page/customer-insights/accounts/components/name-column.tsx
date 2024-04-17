'use client';

import UserContext from '@/contexts/user/user-context';
import { CrispAccount } from '@/lib/customer-insights/types';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
  row: Row<CrispAccount>;
};

export function AccountNameColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className='flex flex-col gap-2 max-w-[400px]'>
      <Link
        className='text-wrap font-medium hover:underline underline-offset-2'
        href={`${
          userContext?.basePath
        }/customer-insights/accounts/${row.original.account_id.toString()}`}
      >
        {row.original.name}
      </Link>
      {row.original.industry && (
        <div className='text-xs text-muted-foreground text-wrap'>
          {row.original.industry}
        </div>
      )}
    </div>
  );
}
