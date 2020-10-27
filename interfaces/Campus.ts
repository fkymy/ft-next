import { Id } from '@interfaces/Id';

export type Campus = {
  id: Id;
  name: string;
  time_zone: string;
  language: {
    id: Id;
    name: string;
    identifier: string;
    created_at: string;
    updated_at: string;
  };
  users_count: number;
  vogsphere_id: Id;
  country: string;
  address: string;
  zip: string;
  city: string;
  website: string;
  facebook: string;
  twitter: string;
  active: boolean;
  email_extension: string;
  // endpoint: CampusEndpoint | null
};

export type CampusEndpoint = {
  id: Id;
  description: string;
  created_at: string;
  updated_at: string;
};
