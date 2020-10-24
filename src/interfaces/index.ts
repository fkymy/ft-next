// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

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
  user: any;
  cursus: any;
};
