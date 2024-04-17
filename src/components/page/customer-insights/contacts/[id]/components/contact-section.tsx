'use client';

import { getCrispContactById } from '@/app/test.actions';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import UserContext from '@/contexts/user/user-context';
import { CrispContact } from '@/lib/customer-insights/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  contactId: string;
};

export function ContactSection({ ...props }: Props) {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState<CrispContact>();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.isLoggedIn() || !props.contactId) {
      return;
    }

    setLoading(true);
    getCrispContactById(userContext?.token, props.contactId)
      .then((res) => {
        if (res !== null) {
          setContact(res);
        }
      })
      .catch(() => {
        toast.error('Something unexpected occured while retrieving contact.');
      })
      .finally(() => setLoading(false));
  }, [userContext?.isLoggedIn(), props.contactId]);

  const isStale = () => {
    if (!contact) {
      return false;
    }

    const now = new Date();
    const lastUpdate = new Date(contact.change_dt);
    const yearInMs = 1000 * 60 * 60 * 24 * 365;
    return Number(now) - Number(lastUpdate) >= yearInMs;
  };

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
                      href={`${userContext?.basePath}/customer-insights/accounts/${contact?.account_id}`}
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
                    isStale() ? 'text-orange-400' : ''
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
            <CardTitle>Contact Info</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Separator />
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='firstName'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Name
              </Label>
              <span id='firstName' className='font-semibold'>
                {contact?.first_name} {contact?.middle_name}{' '}
                {contact?.last_name}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='email'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Email
              </Label>
              <span id='email' className='font-semibold'>
                {contact?.email ?? '-'}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='salutation'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Salutation
              </Label>
              <span id='salutation' className='font-semibold'>
                {contact?.salutation ?? '-'}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='dear'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Dear
              </Label>
              <span id='dear' className='font-semibold'>
                {contact?.dear ?? '-'}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='phone'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Phone
              </Label>
              <span id='type' className='font-semibold'>
                {contact?.phone ?? '-'}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='fax'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Fax
              </Label>
              <span id='fax' className='font-semibold'>
                {contact?.fax ?? '-'}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='ext'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Ext
              </Label>
              <span id='type' className='font-semibold'>
                {contact?.ext ?? '-'}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Company Info</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Separator />
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='company'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Company
              </Label>
              <Link
                href={`${userContext?.basePath}/customer-insights/accounts/${contact?.account_id}`}
                id='company'
                className='font-semibold underline underline-offset-2'
              >
                {contact?.company ?? '-'}
              </Link>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='department'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Department
              </Label>
              <span id='department' className='font-semibold'>
                {contact?.department ?? '-'}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='position'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Position
              </Label>
              <span id='position' className='font-semibold'>
                {contact?.position ?? '-'}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor='title'
                className='uppercase text-xs tracking-wide text-muted-foreground'
              >
                Title
              </Label>
              <span id='title' className='font-semibold'>
                {contact?.title ?? '-'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
