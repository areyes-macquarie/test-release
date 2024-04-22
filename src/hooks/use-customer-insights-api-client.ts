'use client';

import UserContext from '@/contexts/user/user-context';
import { CustomerInsightsApiClient } from '@/lib/customer-insights/customer-insights-api-client';
import { useContext, useEffect } from 'react';

function useCustomerInsightsApiClient() {
  const apiClient = new CustomerInsightsApiClient();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.isLoggedIn()) return;
    apiClient.setToken(userContext.token);
  }, [userContext?.isLoggedIn()]);

  return {
    apiClient,
    apiReady: userContext?.isLoggedIn(),
  };
}

export default useCustomerInsightsApiClient;
