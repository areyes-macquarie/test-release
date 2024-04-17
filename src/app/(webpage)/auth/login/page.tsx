import useEnvVars from '@/hooks/use-env-vars';
import LoginButtons from './login-buttons';

export default function LoginPage() {
  const envVars = useEnvVars();

  return (
    <div className='flex h-dvh'>
      <div className='mx-auto my-auto py-28 text-center px-6 space-y-8'>
        <h2 className='text-5xl font-black'>Macquarie Telecom Group</h2>
        <LoginButtons appHostUrl={envVars.appHostUrl} />
      </div>
    </div>
  );
}
