import useEnvVars from '@/hooks/use-env-vars';
import { AppMsalSessionProvider } from '@/providers/app-msal-session-provider';
import { Configuration } from '@azure/msal-browser';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { azureClientId, logoutRedirectUri, loginredirectUri } = useEnvVars();

  const config: Configuration = {
    auth: {
      clientId: azureClientId,
      redirectUri: loginredirectUri,
      postLogoutRedirectUri: logoutRedirectUri,
      navigateToLoginRequestUrl: true,
    },
  };

  return (
    <AppMsalSessionProvider msalConfig={config}>
      {children}
    </AppMsalSessionProvider>
  );
}
