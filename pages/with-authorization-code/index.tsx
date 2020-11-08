import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Layout from '@components/Layout';

import { getAuthorizeURL, hasToken, getToken, revokeToken } from 'lib/authorizationCode';
import { API_URL, CAMPUS_ID, CURSUS_ID } from '@utils/constants';
import { CursusUser } from '@interfaces/Cursus';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const authorizeURL = getAuthorizeURL();
  const isAuthorized = hasToken();
  let items: CursusUser[] = [];
  const size = query.limit || 100;
  const page = query.page || 1;

  if (isAuthorized) {
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

    console.log(`getServerSideProps res ${JSON.stringify(res.headers)}`);
    items = await res.json();
  } else {
    console.log('NO ACCESS TOKEN!');
  }

  return {
    props: {
      isAuthorized,
      authorizeURL,
      items,
      page,
    },
  };
};

function Login(props: any) {
  return (
    <Link href={`${props.authorizeURL}`}>
      <a>Login</a>
    </Link>
  );
}

function List({ items, page }: { items: CursusUser[]; page: number }) {
  return (
    <div>
      <Link href="/with-authorization-code/me">
        <a>Me</a>
      </Link>
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
                <Link href={`/with-authorization-code/${item.user.login}`}>
                  <a className="text-blue-400">Check Profile</a>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <nav>
        {page > 1 && (
          <Link href={`/with-authorization-code?page=${page - 1}&limit=100`}>
            <a>Previous</a>
          </Link>
        )}
        {page < 5 && (
          <Link href={`/with-authorization-code?page=${+page + +1}&limit=100`}>
            <a>Next</a>
          </Link>
        )}
      </nav>
    </div>
  );
}

type Props = {
  isAuthorized: boolean;
  authorizeURL: string;
  items: CursusUser[];
  page: number;
};

function IndexWithAuthorizationCode({ isAuthorized, authorizeURL, items, page }: Props) {
  return (
    <Layout title="42API">
      <h1>/with-authorization-code</h1>
      <Link href="/patterns">
        <a>Go back to patterns</a>
      </Link>
      <div>
        {isAuthorized ? <List items={items} page={page} /> : <Login authorizeURL={authorizeURL} />}
      </div>
    </Layout>
  );
}

export default IndexWithAuthorizationCode;
