'use client';

import { Button } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { cn } from '@/lib/utils';
import {
  Building2Icon,
  ContactIcon,
  HandshakeIcon,
  LayoutGridIcon,
  Settings,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const userContext = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();
  const basePath = `${userContext?.basePath}/customer-insights`;

  return (
    <div className={cn('pb-12 min-h-[calc(100dvh-65px)]', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Discover
          </h2>
          <div className='space-y-1'>
            <Button
              onClick={() => router.push(basePath)}
              variant={pathname === basePath ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <LayoutGridIcon className='size-4 mr-2.5' />
              Dashboard
            </Button>
            <Button
              onClick={() => router.push(`${basePath}/accounts`)}
              variant={
                pathname.startsWith(`${basePath}/accounts`)
                  ? 'secondary'
                  : 'ghost'
              }
              className='w-full justify-start'
            >
              <Building2Icon className='size-4 mr-2.5' />
              Accounts
            </Button>
            <Button
              onClick={() => router.push(`${basePath}/contacts`)}
              variant={
                pathname.startsWith(`${basePath}/contacts`)
                  ? 'secondary'
                  : 'ghost'
              }
              className='w-full justify-start'
            >
              <ContactIcon className='size-4 mr-2.5' />
              Contacts
            </Button>
            <Button
              onClick={() => router.push(`${basePath}/subscriptions`)}
              variant={
                pathname.startsWith(`${basePath}/subscriptions`)
                  ? 'secondary'
                  : 'ghost'
              }
              className='w-full justify-start'
            >
              <HandshakeIcon className='size-4 mr-2.5' />
              Subscriptions
            </Button>
          </div>
        </div>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Configure
          </h2>
          <div className='space-y-1'>
            <Button
              onClick={() => router.push(`${basePath}/settings`)}
              variant={
                pathname.startsWith(`${basePath}/settings`)
                  ? 'secondary'
                  : 'ghost'
              }
              className='w-full justify-start'
            >
              <Settings className='size-4 mr-2.5' />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
