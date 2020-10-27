import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Layout from '@components/Layout';
import { CursusUser } from '@interfaces/Cursus';

const BASE_URL = 'https://api.intra.42.fr';
const AUTH_URL = BASE_URL + '/oauth/token';
const CAMPUS_ID = 26;
const CURSUS_ID = 21;

const IndexPage = ({ items }: any) => (
  <Layout title="42API">
    <h1>Hello 42API 👋</h1>
    <div>
      <p>{process.env.NEXT_PUBLIC_TEST}</p>
      {/* <p>{data.login}</p>
      <img className="" src={`https://cdn.intra.42.fr/users/${data.login}.jpg`}/> */}
      <ul>
        {items.map((item: CursusUser) => (
          <li key={item.id}>
            <div className="flex flex-row">
              <div className="h-32 w-32">
                <img className="" src={`https://cdn.intra.42.fr/users/${item.user.login}.jpg`} />
              </div>
              <div>
                <p>
                  {item.user.login} | {item.level}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const url = `${BASE_URL}/v2/cursus/${CURSUS_ID}/cursus_users?filter[campus_id]=${CAMPUS_ID}&sort=-blackholed_at&page[size]=100`;
  const bearer = 'Bearer ' + process.env.TMP_ACCESS_TOKEN;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: bearer,
    },
  });

  const items: CursusUser[] = await res.json();

  return {
    props: { items },
  };
};
