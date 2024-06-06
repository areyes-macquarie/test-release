import useEnvVars from '@/hooks/use-env-vars';
import { AppMsalSessionProvider } from '@/providers/app-msal-session-provider';
import { Configuration } from '@azure/msal-browser';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { azureClientId, logoutRedirectUri, loginRedirectUri } = useEnvVars();

  const config: Configuration = {
    auth: {
      clientId: azureClientId,
      redirectUri: loginRedirectUri,
      postLogoutRedirectUri: logoutRedirectUri,
      navigateToLoginRequestUrl: true,
      authority: 'https://login.microsoftonline.com/macquarietelecom.com',
    },
  };

  return (
    <AppMsalSessionProvider msalConfig={config}>
      {children}
    </AppMsalSessionProvider>
  );
}
