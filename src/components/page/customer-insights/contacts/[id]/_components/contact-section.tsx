'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserContext from '@/contexts/user/user-context';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import { isStaleContact } from '@/lib/customer-insights/helper';
import {
  ContactEvent,
  CrispBaseContact,
  CrispContact,
} from '@/lib/customer-insights/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Building2Icon, UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CallsTableSection } from './calls/table-section';
import { EventTimeline } from './event-timeline';
import { EventsTableSection } from './events/table-section';
import { HistoryTableSection } from './history/table-section';

type Props = {
  contactId: string;
};

export function ContactSection({ ...props }: Props) {
  const { apiClient, apiReady } = useCustomerInsightsApiClient();
  const [selectedTab, setSelectedTab] = useState('history');
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState<CrispContact>();
  const [baseContact, setBaseContact] = useState<CrispBaseContact>();
  const userContext = useContext(UserContext);
  const [eventTimelineData, setEventTimelineData] = useState<ContactEvent[]>(
    []
  );

  useEffect(() => {
    if (!apiReady || !baseContact?.base_contact_id) return;

    loadEventsForTimeline()
      .then(() => {})
      .catch(() => {});
  }, [apiReady, baseContact?.base_contact_id]);

  useEffect(() => {
    if (!apiReady || !props.contactId) {
      return;
    }

    setLoading(true);
    apiClient
      .getCrispContactById(props.contactId)
      .then((res) => {
        if (res !== null) {
          setBaseContact(res);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Something unexpected occured while retrieving contact.');
      });
  }, [apiReady, props.contactId]);

  useEffect(() => {
    if (!apiReady || !baseContact?.base_contact_id) {
      return;
    }

    apiClient
      .getCrispContacts(
        `base_contact_id=${baseContact?.base_contact_id}&ordering=-change_dt`
      )
      .then((res) => {
        if (res !== null) {
          setContact(res.objects[0]);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Something unexpected occured while retrieving contact.');
      })
      .finally(() => setLoading(false));
  }, [apiReady, baseContact?.base_contact_id]);

  async function loadEventsForTimeline() {
    const cachedData: ContactEvent[] = [];
    let nextPage = 1;

    const fetchData = async () => {
      try {
        const res = await apiClient.getCrispContactEvents(
          `ordering=-time&base_contact_id=${baseContact?.base_contact_id}&page=${nextPage}`
        );

        if (res) {
          cachedData.push(...res.objects);
          toast.dismiss();
          if (res.meta.next !== null) {
            nextPage++;
            await fetchData(); // Recursively call fetchData for the next page
          } else {
            setEventTimelineData(cachedData); // Set the final data once all pages are fetched
          }
        }
      } catch (error) {
        toast.dismiss();
        toast.error(
          'Something unexpected occurred while retrieving contact events.'
        );
      }
    };

    await fetchData();
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between scroll-m-20 border-b pb-4'>
        {loading ? (
          <div>
            <Skeleton className='w-64 h-16' />
          </div>
        ) : (
          <>
            <h2 className='text-3xl font-semibold tracking-tight'>
              <div className='flex flex-col gap-1'>
                {contact?.first_name} {contact?.last_name}
                <span className='text-sm tracking-wide text-muted-foreground font-light'>
                  {contact?.position ?? 'Unknown position'} {' at '}
                  {contact?.account_id ? (
                    <Link
                      href={`${userContext?.getBasePath()}/customer-insights/accounts/${
                        contact?.account_id
                      }`}
                      id='company'
                      className='tracking-normal underline underline-offset-2'
                    >
                      {contact?.company ?? 'Unknown company'}
                    </Link>
                  ) : (
                    'Unknown company'
                  )}
                </span>
              </div>
            </h2>
            <div className='flex gap-2 mt-auto'>
              {contact?.active && (
                <Badge variant='outline' className='text-xs h-8 w-fit my-auto'>
                  Active
                </Badge>
              )}
              {contact?.type && contact.type !== 'Active' && (
                <Badge variant='outline' className='text-xs h-8 w-fit my-auto'>
                  {contact.type}
                </Badge>
              )}
              {contact?.change_dt && (
                <Badge
                  variant='outline'
                  className={cn(
                    'text-xs h-8 w-fit my-auto',
                    isStaleContact(contact.change_dt) ? 'text-orange-400' : ''
                  )}
                >
                  updated{' '}
                  {formatDistanceToNow(new Date(contact.change_dt), {
                    addSuffix: true,
                  })}
                </Badge>
              )}
            </div>
          </>
        )}
      </div>

      <div className='grid grid-cols md:grid-cols-2 gap-4'>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='text-lg flex'>
              Contact <UserRoundIcon className='size-5 ml-auto' />
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 p-6 rounded-lg'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Name
                </Label>
                <span className='font-medium'>
                  {contact?.first_name} {contact?.middle_name}{' '}
                  {contact?.last_name}
                </span>
              </div>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Email
                </Label>
                <span className='font-medium'>{contact?.email ?? '-'}</span>
              </div>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Salutation
                </Label>
                <span className='font-medium'>
                  {contact?.salutation ?? '-'}
                </span>
              </div>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Dear
                </Label>
                <span className='font-medium'>{contact?.dear ?? '-'}</span>
              </div>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Phone
                </Label>
                <span className='font-medium'>{contact?.phone ?? '-'}</span>
              </div>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Ext
                </Label>
                <span className='font-medium'>{contact?.ext ?? '-'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='text-lg flex'>
              Account <Building2Icon className='size-5 ml-auto' />
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 p-6 rounded-lg'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Company
                </Label>
                <Link
                  href={`${userContext?.getBasePath()}/customer-insights/accounts/${
                    contact?.account_id
                  }`}
                  className='underline underline-offset-2 font-medium'
                >
                  {contact?.company ?? '-'}
                </Link>
              </div>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Department
                </Label>
                <span className='font-medium'>
                  {contact?.department ?? '-'}
                </span>
              </div>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                  Position
                </Label>
                <span className='font-medium'>{contact?.position ?? '-'}</span>
              </div>
              <div className='flex items-center justify-between pb-4 border-b border-muted'>
                <Label
                  htmlFor='title'
                  className='uppercase text-xs tracking-wide text-muted-foreground'
                >
                  Title
                </Label>
                <span id='title' className='font-medium'>
                  {contact?.title ?? '-'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <EventTimeline events={eventTimelineData} />
      </div>
      <div>
        <Tabs
          defaultValue='history'
          className='w-full'
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList className='grid w-[400px] grid-cols-4'>
            <TabsTrigger value='history'>History</TabsTrigger>
            <TabsTrigger value='calls'>Call Logs</TabsTrigger>
            <TabsTrigger value='events'>Events</TabsTrigger>
            <TabsTrigger value='insights'>Insights</TabsTrigger>
          </TabsList>
          <div className={selectedTab === 'history' ? 'mt-5' : 'hidden h-0'}>
            {baseContact?.base_contact_id && (
              <HistoryTableSection
                baseContactId={baseContact?.base_contact_id}
              />
            )}
          </div>
          <div className={selectedTab === 'calls' ? 'mt-5' : 'hidden h-0'}>
            {baseContact?.base_contact_id && (
              <CallsTableSection baseContactId={baseContact?.base_contact_id} />
            )}
          </div>
          <div className={selectedTab === 'events' ? 'mt-5' : 'hidden h-0'}>
            {baseContact?.base_contact_id && (
              <EventsTableSection
                baseContactId={baseContact?.base_contact_id}
              />
            )}
          </div>
          <div className={selectedTab === 'insights' ? 'mt-5' : 'hidden h-0'}>
            <span className='text-muted-foreground'>Coming soon...</span>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
