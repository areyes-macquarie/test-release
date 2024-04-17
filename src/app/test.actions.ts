'use server';

import { CustomerInsightsApiClient } from '@/lib/customer-insights/customer-insights-api-client';

const apiClient = new CustomerInsightsApiClient();

export async function getCrispAccounts(token: string, searchParams?: string) {
  apiClient.setToken(token);
  return await apiClient.getCrispAccounts(searchParams);
}

export async function getCrispAccountById(token: string, id: string) {
  apiClient.setToken(token);
  return await apiClient.getCrispAccountById(id);
}

export async function getCrispContacts(token: string, searchParams?: string) {
  apiClient.setToken(token);
  return await apiClient.getCrispContacts(searchParams);
}

export async function getCrispContactById(token: string, id: string) {
  apiClient.setToken(token);
  return await apiClient.getCrispContactById(id);
}

export async function getGlobalMetric(token: string) {
  apiClient.setToken(token);
  return await apiClient.getGlobalMetric();
}

export async function getAccountMetric(token: string, id: string) {
  apiClient.setToken(token);
  return await apiClient.getAccountMetric(id);
}
