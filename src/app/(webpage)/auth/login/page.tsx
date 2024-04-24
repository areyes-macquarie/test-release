import useEnvVars from '@/hooks/use-env-vars';
import Image from 'next/image';
import LoginButtons from './login-buttons';

export default function LoginPage() {
  const envVars = useEnvVars();

  return (
    <div className='flex h-dvh'>
      <div className='mx-auto my-auto py-28 text-center px-6 space-y-8'>
        <Image
          src='/mtg-logo-dark.svg'
          width={400}
          height={100}
          alt='mtg'
          className='hidden dark:block mx-auto'
        />
        <Image
          src='/mtg-logo-light.svg'
          width={400}
          height={1600}
          alt='mtg'
          className='block dark:hidden mx-auto'
        />
        <LoginButtons appHostUrl={envVars.appHostUrl} />
      </div>
    </div>
  );
}
