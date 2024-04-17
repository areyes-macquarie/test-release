'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href='/'
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/' ? '' : 'text-muted-foreground'
        )}
      >
        Dashboard
      </Link>
      <Link
        href='/customer-insights'
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname.startsWith('/customer-insights')
            ? ''
            : 'text-muted-foreground'
        )}
      >
        Customer Insights
      </Link>
    </nav>
  );
}
