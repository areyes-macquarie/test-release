'use client';

import UserContext from '@/contexts/user/user-context';
import { CustomerInsightsApiClient } from '@/lib/customer-insights/customer-insights-api-client';
import { useContext, useEffect } from 'react';

const apiClient = new CustomerInsightsApiClient();

function useCustomerInsightsApiClient() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext || !userContext.token) return;
    apiClient.setToken(userContext.token);
  }, [userContext?.token]);

  return {
    apiClient,
    apiReady: userContext?.isLoggedIn(),
  };
}

export default useCustomerInsightsApiClient;
