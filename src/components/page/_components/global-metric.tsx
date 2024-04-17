'use client';

import { getGlobalMetric } from '@/app/test.actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserContext from '@/contexts/user/user-context';
import { MetricDataItem } from '@/lib/customer-insights/types';
import {
  Building2Icon,
  UserRoundCheckIcon,
  UserRoundIcon,
  UserRoundMinusIcon,
  UserRoundXIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

type Props = {
  hideContacts?: boolean;
  hideAccounts?: boolean;
};

export function GlobalMetric({ ...props }: Props) {
  const [metric, setMetric] = useState<MetricDataItem[]>();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.isLoggedIn()) return;

    getGlobalMetric(userContext.token)
      .then((res) => {
        if (res !== null) {
          setMetric(res.objects);
        }
      })
      .catch(() => {});
  }, [userContext?.isLoggedIn()]);

  return (
    <div className='grid gap-4 grid-cols-3 w-full'>
      {!props.hideAccounts && (
        <>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Accounts
              </CardTitle>
              <Building2Icon className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {(
                  metric?.find((m) => m.metric === 'total_accounts_count')
                    ?.value ?? 0
                ).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>No Contacts</CardTitle>
              <UserRoundXIcon className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {(
                  metric?.find((m) => m.metric === 'empty_accounts_count')
                    ?.value ?? 0
                ).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 gap-2'>
              <CardTitle className='text-sm font-medium'>
                Average Contact Per Account
              </CardTitle>
              <UserRoundIcon className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {(
                  metric?.find(
                    (m) => m.metric === 'total_account_contacts_average'
                  )?.value ?? 0
                ).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </>
      )}
      {!props.hideContacts && (
        <>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Contacts
              </CardTitle>
              <UsersRoundIcon className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {(
                  metric?.find((m) => m.metric === 'total_contacts_count')
                    ?.value ?? 0
                ).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Unique Contacts
              </CardTitle>
              <UserRoundCheckIcon className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {(
                  metric?.find((m) => m.metric === 'unique_contacts_count')
                    ?.value ?? 0
                ).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Stale Contacts
              </CardTitle>
              <UserRoundMinusIcon className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {(
                  metric?.find((m) => m.metric === 'stale_contacts_count')
                    ?.value ?? 0
                ).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
