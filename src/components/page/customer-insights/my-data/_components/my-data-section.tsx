'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import usePageParams from '@/hooks/use-stateful-search-params';
import { useEffect, useState } from 'react';
import { AccountTableSection } from './accounts/account-table-section';
import { CustomerTableSection } from './customers/customer-table-section';

const TAB_PARAM_NAME = 'tab';

export function MyDataSection() {
  const { pageParams, push } = usePageParams();
  const [selectedTab, setSelectedTab] = useState('contacts');

  useEffect(() => {
    setSelectedTab(
      pageParams.get(TAB_PARAM_NAME)?.toLowerCase() === 'accounts'
        ? 'accounts'
        : 'contacts'
    );
  }, [pageParams.get(TAB_PARAM_NAME)]);

  return (
    <div>
      <Tabs
        defaultValue='contacts'
        className='w-full'
        value={selectedTab}
        onValueChange={(value) => {
          pageParams.set(TAB_PARAM_NAME, value);
          push();
        }}
      >
        <TabsList className='grid w-[250px] grid-cols-2'>
          <TabsTrigger value='contacts'>Contacts</TabsTrigger>
          <TabsTrigger value='accounts'>Accounts</TabsTrigger>
        </TabsList>
        <div className={selectedTab === 'contacts' ? 'mt-5' : 'hidden h-0'}>
          <CustomerTableSection />
        </div>
        <div className={selectedTab === 'accounts' ? 'mt-5' : 'hidden h-0'}>
          <AccountTableSection />
        </div>
      </Tabs>
    </div>
  );
}
