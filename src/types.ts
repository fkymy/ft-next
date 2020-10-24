export type CursusUser = {
  grade: string;
  level: number;
  skills: [];
  blackholed_at: string;
  id: number;
  begin_at: string;
  end_at?: string;
  cursus_id: number;
  has_coalition: boolean;
  user: object;
  cursus: object;
};

const test = {
  "grade": "Learner",
  "level": 3.04,
  "blackholed_at": "2021-04-21T02:00:00.000Z",
  "id": 93118,
  "begin_at": "2020-06-22T02:00:00.000Z",
  "end_at": null,
  "cursus_id": 21,
  "has_coalition": true,
  "user": {
    "id": 68162,
    "login": "yufukuya",
    "url": "https://api.intra.42.fr/v2/users/yufukuya"
  },
  "cursus": {
    "id": 21,
    "created_at": "2019-07-29T08:45:17.896Z",
    "name": "42cursus",
    "slug": "42cursus"
  }
}