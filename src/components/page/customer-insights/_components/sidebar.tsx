'use client';

import { Button } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { cn } from '@/lib/utils';
import {
  AsteriskIcon,
  BookUserIcon,
  BotMessageSquareIcon,
  Building2Icon,
  ContactIcon,
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
  const basePath = `${userContext?.getBasePath()}/customer-insights`;

  return (
    <div
      className={cn('pb-6 min-h-[calc(100dvh-65px)] flex flex-col', className)}
    >
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
              onClick={() =>
                router.push(`${basePath}/my-data?tab=contacts&subject=managed`)
              }
              variant={
                pathname.startsWith(`${basePath}/my-data`)
                  ? 'secondary'
                  : 'ghost'
              }
              className='w-full justify-start'
            >
              <BookUserIcon className='size-4 mr-2.5' />
              My Data
            </Button>
            <Button
              onClick={() => router.push(`${basePath}/mac-query`)}
              variant={
                pathname.startsWith(`${basePath}/mac-query`)
                  ? 'secondary'
                  : 'ghost'
              }
              className='w-full justify-start'
            >
              <AsteriskIcon className='size-4 mr-2.5' />
              Mac Query
            </Button>
            <Button
              onClick={() => router.push(`${basePath}/mac-chat`)}
              variant={
                pathname.startsWith(`${basePath}/mac-chat`)
                  ? 'secondary'
                  : 'ghost'
              }
              className='w-full justify-start'
            >
              <BotMessageSquareIcon className='size-4 mr-2.5' />
              Mac Chat
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
