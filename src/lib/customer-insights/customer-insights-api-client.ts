import isEmpty from '@/services/shared/helpers/is-empty';
import {
  ApiCollectionResponse,
  ContactCallLog,
  ContactEvent,
  CrispAccount,
  CrispBaseContact,
  CrispContact,
  FollowedAccount,
  FollowedContact,
  MetricDataItem,
  QueryResultAccount,
} from './types';

const CUSTOMER_INSIGHT_API_HOST =
  process.env.NEXT_PUBLIC_CUSTOMER_INSIGHT_API_HOST!;

export class CustomerInsightsApiClient {
  constructor(protected _accessToken?: string) {}

  /**
   * Account
   */

  async getCrispAccounts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/crisp/accounts?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<CrispAccount[]>;
      } else {
        throw new Error('Failed retrieving CRISP accounts.');
      }
    });
  }

  async getCrispAccountById(id: string) {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/crisp/accounts/${id}`, {
      cache: 'no-store',
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as CrispAccount;
      } else {
        throw new Error('Failed retrieving account details.');
      }
    });
  }

  /**
   * Contact
   */

  async getBaseContacts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/basecontact/?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<CrispBaseContact[]>;
      } else {
        throw new Error('Failed retrieving base contacts.');
      }
    });
  }

  async getCrispContacts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/crisp/contacts/instances?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<CrispContact[]>;
      } else {
        throw new Error('Failed retrieving CRISP contacts.');
      }
    });
  }

  async getCrispContactById(id: string) {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/crisp/contacts/${id}`, {
      cache: 'no-store',
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as CrispBaseContact;
      } else {
        throw new Error('Failed retrieving contact details.');
      }
    });
  }

  /**
   * Contact Sub Data
   */

  async getCrispContactEvents(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/core/events?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<ContactEvent[]>;
      } else {
        throw new Error('Failed retrieving events.');
      }
    });
  }

  async getCrispContactCalls(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/core/twilio?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<ContactCallLog[]>;
      } else {
        throw new Error('Failed retrieving calls.');
      }
    });
  }

  /**
   * My Data
   */

  async followContact(params: {
    baseContactId: number;
    userId: string;
    userName: string;
  }) {
    const payload = {
      base_contact: params.baseContactId,
      user_id: params.userId,
      user_name: params.userName,
    };

    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/app/following/contacts`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<ContactCallLog[]>;
      } else {
        throw new Error('Failed to follow contact.');
      }
    });
  }

  async unfollowContact(params: { subscriptionId: number }) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/app/following/contacts/${params.subscriptionId}/delete`,
      {
        method: 'DELETE',
        headers: this.getHeaders(),
      }
    ).then((res) => {
      if (res.ok) {
        return true;
      } else {
        throw new Error('Failed to unfollow contact.');
      }
    });
  }

  async getFollowedContacts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/app/following/contacts?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<FollowedContact[]>;
      } else {
        throw new Error('Failed retrieving followed contacts.');
      }
    });
  }

  async followAccount(params: {
    accountId: number;
    userId: string;
    userName: string;
  }) {
    const payload = {
      account: params.accountId,
      user_id: params.userId,
      user_name: params.userName,
    };

    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/app/following/accounts`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<ContactCallLog[]>;
      } else {
        throw new Error('Failed to follow account.');
      }
    });
  }

  async unfollowAccount(params: { subscriptionId: number }) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/app/following/accounts/${params.subscriptionId}/delete`,
      {
        method: 'DELETE',
        headers: this.getHeaders(),
      }
    ).then((res) => {
      if (res.ok) {
        return true;
      } else {
        throw new Error('Failed to unfollow account.');
      }
    });
  }

  async getFollowedAccounts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/app/following/accounts?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<FollowedAccount[]>;
      } else {
        throw new Error('Failed retrieving followed accounts.');
      }
    });
  }

  async getManagedContacts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/app/managed/contacts?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<FollowedContact[]>;
      } else {
        throw new Error('Failed retrieving managed contacts.');
      }
    });
  }

  async getManagedAccounts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/app/managed/accounts?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<FollowedAccount[]>;
      } else {
        throw new Error('Failed retrieving managed accounts.');
      }
    });
  }

  /**
   * Mac Query
   */

  async sendEngineQuery(query: string) {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/engine/query`, {
      method: 'POST',
      cache: 'no-store',
      headers: this.getHeaders(),
      body: JSON.stringify({
        query: query,
      }),
    }).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<
          QueryResultAccount[]
        >;
      } else {
        throw new Error('Failed executing engine query.');
      }
    });
  }

  async getEngineQuery(query: string) {
    const queryParams = isEmpty(query) ? `?query=` : `?${query}`;

    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/engine/query${queryParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<
          QueryResultAccount[]
        >;
      } else {
        throw new Error('Failed executing engine query.');
      }
    });
  }

  /**
   * Mac Chat
   */

  async sendChatMessage(prompt: string, signal?: AbortSignal) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/engine/generate?prompt=${prompt}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: this.getHeaders(),
        signal,
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error('Failed to send chat prompt.');
      }

      const reader = res.body?.getReader();
      return reader;
    });
  }

  async getUserChatSession(signal?: AbortSignal) {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/app/sessions`, {
      method: 'GET',
      cache: 'no-store',
      headers: this.getHeaders(),
      signal,
    }).then(async (res) => {
      if (res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (await res.json()) as ApiCollectionResponse<any>;
      } else {
        throw new Error('Failed retrieving global metric.');
      }
    });
  }

  /**
   * Metrics
   */

  async getGlobalMetric(): Promise<ApiCollectionResponse<
    MetricDataItem[]
  > | null> {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/core/metrics/global`, {
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<MetricDataItem[]>;
      } else {
        throw new Error('Failed retrieving global metric.');
      }
    });
  }

  async getAccountMetric(
    id: string
  ): Promise<ApiCollectionResponse<MetricDataItem[]> | null> {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/core/metrics/account?account_id=${id}`,
      {
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ApiCollectionResponse<MetricDataItem[]>;
      } else {
        throw new Error('Failed retrieving account metric.');
      }
    });
  }

  /**
   * Class setting
   */

  setToken(accessToken: string) {
    this._accessToken = accessToken;
  }

  private getHeaders(additionalHeaders?: { [key: string]: string }) {
    const baseHeaders = {
      Authorization: `Bearer ${this._accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return { ...baseHeaders, ...additionalHeaders };
  }
}
