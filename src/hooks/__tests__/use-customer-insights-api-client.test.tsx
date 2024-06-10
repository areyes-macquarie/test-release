import UserContextProvider from '@/contexts/user/user-provider';
import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import useCustomerInsightsApiClient from '../use-customer-insights-api-client';

const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'John Smith',
  token: 'testtoken',
};

type WrapperProps = {
  children: ReactNode;
};

describe('useCustomerInsightsApiClient', () => {
  test('API should be  ready if there is a user', () => {
    const wrapper = ({ children }: WrapperProps) => {
      return (
        <UserContextProvider user={mockUser} basePath=''>
          {children}
        </UserContextProvider>
      );
    };

    const {
      result: { current },
    } = renderHook(() => useCustomerInsightsApiClient(), {
      wrapper,
    });
    const { apiReady } = current;

    expect(apiReady).toBeTruthy();
  });

  test('API should not be ready if there is a user', () => {
    const wrapper = ({ children }: WrapperProps) => {
      return (
        <UserContextProvider user={null} basePath=''>
          {children}
        </UserContextProvider>
      );
    };

    const {
      result: { current },
    } = renderHook(() => useCustomerInsightsApiClient(), {
      wrapper,
    });
    const { apiReady } = current;

    expect(apiReady).toBeFalsy();
  });
});
