import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Layout from '@components/layout';
import { CursusUser } from '@interfaces/Cursus';
import { API_URL, CAMPUS_ID, CURSUS_ID } from '@utils/constants';
import { getToken } from '@lib/clientCredentials';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const size = query.limit || 100;
  const page = query.page || 1;

  const url =
    `${API_URL}/v2/cursus/${CURSUS_ID}/cursus_users` +
    `?filter[campus_id]=${CAMPUS_ID}` +
    `&sort=-blackholed_at` +
    `&page[size]=${size}` +
    `&page[number]=${page}`;

  const res = await getToken().then((access_token) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
  const items: CursusUser[] = await res.json();

  return {
    props: {
      items,
      page,
    },
  };
};

type Props = {
  items: CursusUser[];
  page: number;
};

const IndexWithClientCredentials = ({ items, page }: Props) => (
  <Layout title="42API">
    <h1>/patterns/with-client-credentials</h1>
    <Link href="/patterns">
      <a>Go back to patterns</a>
    </Link>
    <div>
      <p>page {page}</p>
    </div>
    <div>
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.id}>
            <div className="flex flex-row space-x-4">
              <div>
                <img
                  className="object-cover h-32 w-32"
                  src={`https://cdn.intra.42.fr/users/small_${item.user.login}.jpg`}
                />
              </div>
              <div>
                <p>login: {item.user.login}</p>
                <p>id: {item.id}</p>
                <p>level: {item.level}</p>
                <p>begin_at: {item.begin_at}</p>
                <p>blackholed_at: {item.blackholed_at}</p>
                <Link href={`/patterns/with-client-credentials/${item.user.login}`}>
                  <a className="text-blue-400">Check Profile</a>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <nav>
        {page > 1 && (
          <Link href={`/patterns/with-client-credentials?page=${page - 1}&limit=100`}>
            <a>Previous</a>
          </Link>
        )}
        {page < 5 && (
          <Link href={`/patterns/with-client-credentials?page=${+page + +1}&limit=100`}>
            <a>Next</a>
          </Link>
        )}
      </nav>
    </div>
  </Layout>
);

export default IndexWithClientCredentials;
