import { unstable_noStore as noStore } from 'next/cache';

function useEnvVars() {
  noStore();

  return {
    environment: process.env.NODE_ENV ?? 'development',
    appHostUrl: process.env.APP_HOST_URL ?? 'http://localhost:3000',
    azureClientId: process.env.AZURE_CLIENT_ID ?? '',
    loginredirectUri: process.env.AUTH_LOGIN_REDIRECT_URI ?? '',
    logoutRedirectUri: process.env.AUTH_LOGOUT_REDIRECT_URI ?? '',
    customerInsightsApiHost:
      process.env.NEXT_PUBLIC_CUSTOMER_INSIGHT_API_HOST ??
      'https://customer-insights-api.macquariecloudservices.com/api',
  };
}

export default useEnvVars;
