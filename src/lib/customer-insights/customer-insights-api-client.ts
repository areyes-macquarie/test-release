import {
  ApiCollectionResponse,
  ContactCallLog,
  ContactEvent,
  CrispAccount,
  CrispContact,
  MetricDataItem,
} from './types';

const CUSTOMER_INSIGHT_API_HOST =
  process.env.NEXT_PUBLIC_CUSTOMER_INSIGHT_API_HOST!;

export class CustomerInsightsApiClient {
  constructor(protected _accessToken?: string) {}

  async getCrispAccounts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/crispaccount/?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as ApiCollectionResponse<CrispAccount[]>;
      } else {
        console.error('Failed retrieving CRISP accounts');
        return null;
      }
    });
  }

  async getCrispAccountById(id: string) {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/crispaccount/${id}/`, {
      cache: 'no-store',
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as CrispAccount;
      } else {
        console.error('Failed retrieving CRISP account');
        return null;
      }
    });
  }

  async getCrispContacts(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/crispcontact/?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as ApiCollectionResponse<CrispContact[]>;
      } else {
        console.error('Failed retrieving CRISP contacts');
        return null;
      }
    });
  }

  async getCrispContactById(id: string) {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/crispcontact/${id}/`, {
      cache: 'no-store',
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as CrispContact;
      } else {
        console.error('Failed retrieving CRISP contacts');
        return null;
      }
    });
  }

  async getCrispContactEvents(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/contactevent/?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as ApiCollectionResponse<ContactEvent[]>;
      } else {
        console.error('Failed retrieving contact events');
        return null;
      }
    });
  }

  async getCrispContactCalls(searchParams?: string) {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/twiliocall/?${searchParams}`,
      {
        cache: 'no-store',
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as ApiCollectionResponse<ContactCallLog[]>;
      } else {
        console.error('Failed retrieving calls');
        return null;
      }
    });
  }

  async getGlobalMetric(): Promise<ApiCollectionResponse<
    MetricDataItem[]
  > | null> {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/globalmetric/`, {
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as ApiCollectionResponse<MetricDataItem[]>;
      } else {
        console.error('Failed retrieving global metric');
        return null;
      }
    });
  }

  async getAccountMetric(
    id: string
  ): Promise<ApiCollectionResponse<MetricDataItem[]> | null> {
    return await fetch(
      `${CUSTOMER_INSIGHT_API_HOST}/accountmetric/?account_id=${id}`,
      {
        headers: this.getHeaders(),
      }
    ).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as ApiCollectionResponse<MetricDataItem[]>;
      } else {
        console.error('Failed retrieving global metric');
        return null;
      }
    });
  }

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
