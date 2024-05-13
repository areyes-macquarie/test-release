export type ApiResponseMeta = {
  count: number;
  model: string;
  next: string;
  page: number;
  previous: string;
};

export type ApiCollectionResponse<T> = {
  meta: ApiResponseMeta;
  objects: T;
};

export type CrispAccount = {
  account_id: number;
  ext: number;
  home_page: string;
  industry: string;
  name: string;
  notes: string;
  num_of_employees: number;
  parent_id: number;
  phone: string;
};

export type CrispBaseContact = {
  base_contact_id: number;
  first_name: string;
  last_name: string;
  state: string;
}

export type CrispContact = {
  account_contact_id: number;
  account_id: number;
  active: boolean;
  base_contact_id: number;
  change_dt: string;
  company: string;
  dear: null | string;
  department: null | string;
  email: null | string;
  ext: null | string;
  fax: null | string;
  first_name: string;
  last_name: string;
  middle_name: null | string;
  nickname: string;
  pager: null | string;
  phone: string;
  position: string;
  salutation: string;
  title: string;
  type: string;
};

export type ContactEvent = {
  base_contact_id: number;
  event: string;
  event_id: number;
  time: string;
  type: string;
};

export type ContactCallLog = {
  base_contact_id: number;
  call_id: number;
  duration: string;
  from_: string;
  to: string;
  start: string;
};

export type ContactSubscription = {
  type: string;
  first_name: string;
  email: string;
  last_name: string;
  account_contact_id: number;
  account_id: number;
  company: string;
  base_contact_id: number;
  subscription_id: number;
  user_id: string;
  user_name: string;
  created: string;
  position: string;
  active: string;
  change_dt: string;
};

export type MetricDataItem = {
  metric_id: number;
  value: number;
  metric: string;
};
