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

export type MetricDataItem = {
  metric_id: number;
  value: number;
  metric: string;
};
