'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserContext from '@/contexts/user/user-context';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import { isStaleContact } from '@/lib/customer-insights/helper';
import { ContactEvent, CrispContact } from '@/lib/customer-insights/types';
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
  const userContext = useContext(UserContext);
  const [eventTimelineData, setEventTimelineData] = useState<ContactEvent[]>(
    []
  );

  useEffect(() => {
    if (!apiReady || !contact?.base_contact_id) return;

    loadEventsForTimeline()
      .then(() => {})
      .catch(() => {});
  }, [apiReady, contact?.base_contact_id]);

  useEffect(() => {
    if (!apiReady || !props.contactId) {
      return;
    }

    setLoading(true);
    apiClient
      .getCrispContactById(props.contactId)
      .then((res) => {
        if (res !== null) {
          setContact(res);
        }
      })
      .catch(() => {
        toast.error('Something unexpected occured while retrieving contact.');
      })
      .finally(() => setLoading(false));
  }, [apiReady, props.contactId]);

  async function loadEventsForTimeline() {
    const cachedData: ContactEvent[] = [];
    let nextPage = 1;

    const fetchData = async () => {
      try {
        const res = await apiClient.getCrispContactEvents(
          `ordering=-time&base_contact_id=${contact?.base_contact_id}&page=${nextPage}`
        );
        if (res) {
          cachedData.push(...res.objects);
          toast.dismiss();
          if (res.meta.next !== '') {
            nextPage++;
            await fetchData(); // Recursively call fetchData for the next page
          } else {
            setEventTimelineData(cachedData); // Set the final data once all pages are fetched
          }
        }
      } catch (error) {
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
                      className='tracking-normal hover:underline underline-offset-2'
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
        <Card>
          <CardHeader>
            <CardTitle className='text-lg flex'>
              Contact <UserRoundIcon className='size-5 ml-auto' />
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Separator />
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Name
              </Label>
              <span>
                {contact?.first_name} {contact?.middle_name}{' '}
                {contact?.last_name}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Email
              </Label>
              <span>{contact?.email ?? '-'}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Salutation
              </Label>
              <span>{contact?.salutation ?? '-'}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Dear
              </Label>
              <span>{contact?.dear ?? '-'}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Phone
              </Label>
              <span>{contact?.phone ?? '-'}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Ext
              </Label>
              <span>{contact?.ext ?? '-'}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg flex'>
              Account <Building2Icon className='size-5 ml-auto' />
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Separator />
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Company
              </Label>
              <Link
                href={`${userContext?.getBasePath()}/customer-insights/accounts/${
                  contact?.account_id
                }`}
                className='underline underline-offset-2'
              >
                {contact?.company ?? '-'}
              </Link>
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Department
              </Label>
              <span>{contact?.department ?? '-'}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='uppercase text-xs tracking-wide text-muted-foreground'>
                Position
              </Label>
              <span>{contact?.position ?? '-'}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='title'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Title
              </Label>
              <span id='title'>{contact?.title ?? '-'}</span>
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
            {contact?.base_contact_id && (
              <HistoryTableSection baseContactId={contact?.base_contact_id} />
            )}
          </div>
          <div className={selectedTab === 'calls' ? 'mt-5' : 'hidden h-0'}>
            {contact?.base_contact_id && (
              <CallsTableSection baseContactId={contact?.base_contact_id} />
            )}
          </div>
          <div className={selectedTab === 'events' ? 'mt-5' : 'hidden h-0'}>
            {contact?.base_contact_id && (
              <EventsTableSection baseContactId={contact?.base_contact_id} />
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
