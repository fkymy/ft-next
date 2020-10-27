import { Id } from '@interfaces/Id';
import { ProjectUser } from '@interfaces/Project';
import { CursusUser } from '@interfaces/Cursus';
import { Campus } from '@interfaces/Campus';

export type User = {
  id: Id;
  login: string;
  url: string;
};

export type Profile = {
  id: Id;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  url: string;
  phone: string;
  displayname: string;
  image_url: string;
  'staff?': boolean;
  correction_point: number;
  pool_month: string | null;
  pool_year: string | null;
  location: string | null;
  wallet: number;
  anonymize_date: string | null;
  groups: any[];
  cursus_users: CursusUser[];
  projects_users: ProjectUser[];
  languages_users: any;
  achievements: {
    id: Id;
    name: string;
    description: string;
    tier: string;
    kind: string;
    visible: boolean;
    image: string;
    nbr_of_success: number | null;
    users_url: string;
  }[];
  titles: any;
  titles_users: any;
  partnerships: {
    id: Id;
    name: string;
    slug: string;
    tier: number;
    url: string;
    partnerships_users_url: string;
  }[];
  patroned: {
    id: Id;
    user_id: Id;
    godfather_id: Id;
    ongoing: boolean;
    created_at: string;
    updated_at: string;
  }[];
  patroning: any[];
  expertises_users: {
    id: Id;
    expertise_id: Id;
    interested: boolean;
    value: number;
    contact_me: boolean;
    created_at: string;
    user_id: Id;
  }[];
  campus: Campus[];
  campus_users: any;
};
