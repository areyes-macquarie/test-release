'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import { MetricDataItem } from '@/lib/customer-insights/types';
import {
  UserRoundCheckIcon,
  UserRoundMinusIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  accountId: string;
};

export function AccountMetric({ ...props }: Props) {
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const [metric, setMetric] = useState<MetricDataItem[]>();

  useEffect(() => {
    if (!apiReady || !props.accountId) return;

    apiClient
      .getAccountMetric(props.accountId)
      .then((res) => {
        if (res !== null) {
          setMetric(res.objects);
        }
      })
      .catch(() => {});
  }, [props.accountId, apiReady]);

  return (
    <div className='grid gap-4 grid-cols-3 w-full'>
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
                metric?.find((m) => m.metric === 'total_company_contacts_count')
                  ?.value ?? 0
              ).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Contacts
            </CardTitle>
            <UserRoundCheckIcon className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {(
                metric?.find(
                  (m) => m.metric === 'active_company_contacts_count'
                )?.value ?? 0
              ).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 gap-2'>
            <CardTitle className='text-sm font-medium'>
              Stale Contacts
            </CardTitle>
            <UserRoundMinusIcon className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {(
                metric?.find((m) => m.metric === 'stale_company_contacts_count')
                  ?.value ?? 0
              ).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </>
    </div>
  );
}
