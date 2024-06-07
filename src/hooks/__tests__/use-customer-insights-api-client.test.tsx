import { renderHook } from '@testing-library/react';
import useCustomerInsightsApiClient from '../use-customer-insights-api-client';
import UserContextProvider from '@/contexts/user/user-provider';
import { ReactNode } from 'react';

// const mockValue = {
//   id: this.state.userContext?.id ?? '',
//   email: this.state.userContext?.email ?? '',
//   name: this.state.userContext?.name ?? '',
//   token: this.state.userContext?.token ?? '',
//   getBasePath: this.getBasePath,
//   setBasePath: this.setBasePath,
//   setUserContext: this.setUserContext,
//   getUserContext: this.getUserContext,
//   isLoggedIn: this.isLoggedIn,
// };

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
