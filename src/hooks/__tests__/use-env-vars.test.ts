import { renderHook } from '@testing-library/react';
import useEnvVars from '../use-env-vars';

const TEST_ENV = {
  environment: process.env.NODE_ENV,
  appHostUrl: process.env.APP_HOST_URL,
  azureClientId: process.env.AZURE_CLIENT_ID,
  loginRedirectUri: process.env.AUTH_LOGIN_REDIRECT_URI,
  logoutRedirectUri: process.env.AUTH_LOGOUT_REDIRECT_URI,
  customerInsightsApiHost: process.env.NEXT_PUBLIC_CUSTOMER_INSIGHT_API_HOST,
  appVersion: '',
};

describe('useEnvVars', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('should be in test environment', () => {
    expect(process.env.NODE_ENV).toEqual('test');
  });

  test('should match env from env.test', () => {
    const { result } = renderHook(useEnvVars);

    expect(result.current).toEqual(TEST_ENV);
  });

  test('should use default values', () => {
    process.env = {
      ...process.env,
      // @ts-expect-error: Only accepts "development" | "production" | "test" as we need to test default return
      NODE_ENV: null,
      APP_HOST_URL: undefined,
      AZURE_CLIENT_ID: undefined,
      AUTH_LOGIN_REDIRECT_URI: undefined,
      AUTH_LOGOUT_REDIRECT_URI: undefined,
      NEXT_PUBLIC_CUSTOMER_INSIGHT_API_HOST: undefined,
      appVersion: undefined,
    };

    const { result } = renderHook(useEnvVars);

    expect(result.current).toEqual({
      environment: 'development',
      appHostUrl: 'http://localhost:3000',
      azureClientId: '',
      loginRedirectUri: '',
      logoutRedirectUri: '',
      customerInsightsApiHost:
        'https://customer-insights-api.macquariecloudservices.com/api',
      appVersion: '',
    });
  });
});
