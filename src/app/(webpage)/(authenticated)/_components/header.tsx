import { MainNav } from '@/app/(webpage)/(authenticated)/_components/main-nav';
import { UserNav } from '@/app/(webpage)/(authenticated)/_components/user-nav';
import { ThemeModeToggle } from '@/components/shared/theme-toggle';
import useEnvVars from '@/hooks/use-env-vars';
import Image from 'next/image';

export function Header() {
  const envVars = useEnvVars();
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <h2 className='font-black tracking-wide text-2xl'>
          <Image
            src='/mtg-logo-dark.svg'
            width={180}
            height={100}
            alt='mtg'
            className='hidden dark:block'
          />
          <Image
            src='/mtg-logo-light.svg'
            width={160}
            height={1600}
            alt='mtg'
            className='block dark:hidden'
          />
        </h2>
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserNav appHostUrl={envVars.appHostUrl} />
          <ThemeModeToggle />
        </div>
      </div>
    </div>
  );
}
