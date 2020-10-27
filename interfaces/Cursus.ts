import { User } from '@interfaces/User';

export type Cursus = {
  id: number;
  created_at: string | null;
  name: string;
  slug: string;
};

export type CursusUser = {
  grade: string | null;
  level: number | null;
  skills: any;
  blackholed_at: string | null;
  id: number;
  begin_at: string | null;
  end_at: string | null;
  cursus_id: number;
  has_coalition: boolean;
  user: User;
  cursus: Cursus;
};
