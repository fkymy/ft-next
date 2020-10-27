import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { CursusUser } from '@interfaces/Cursus';
import Layout from '@components/Layout';

type Props = {
  items: CursusUser[];
  page: number;
  pageCount: number;
};

const IndexWithSampleData = ({ items, pageCount, page }: Props) => (
  <Layout title="with-sample-data">
    <h1>/with-sample-data</h1>
    <h2>
      https://api.intra.42.fr/v2/cursus/21/cursus_users?filter[campus_id]=26&sort=-blackholed_at&page[size]=100
    </h2>
    <Link href="/patterns">
      <a>Go back to patterns</a>
    </Link>
    <div>
      {/* <p>items.length {items.length}</p> */}
      <p>pageCount {pageCount}</p>
      <p>page {page}</p>
    </div>
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex flex-row space-x-4">
            <div>
              <img
                className="object-cover h-32 w-32"
                src={`https://cdn.intra.42.fr/users/${item.user.login}.jpg`}
              />
            </div>
            <div>
              <p>login: {item.user.login}</p>
              <p>id: {item.id}</p>
              <p>level: {item.level}</p>
              <p>begin_at: {item.begin_at}</p>
              <p>blackholed_at: {item.blackholed_at}</p>
              <Link href={`/with-sample-data/profile?id=${item.id}`}>
                <a className="text-blue-400">Check Profile</a>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
    <nav>
      {page > 1 && (
        <Link href={`/with-sample-data?page=${page - 1}&limit=100`}>
          <a>Previous</a>
        </Link>
      )}
      {page < pageCount && (
        <Link href={`/with-sample-data?page=${page + 1}&limit=100`}>
          <a>Next</a>
        </Link>
      )}
    </nav>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  // const items: CursusUser[] = await getSampleData();
  const dev = process.env.NODE_ENV !== 'production';
  const protocol = dev ? 'http' : req.headers['x-forwarded-proto'];
  const host = dev ? 'localhost:3000' : req.headers['x-forwarded-host'];
  const page = query.page || 1;
  const limit = query.limit || 100;
  console.log(`getServerSideProps with query: ${JSON.stringify(query)}`);
  console.log(
    `getServerSideProps calling: ${protocol}://${host}/api/with_sample_data?page=${page}&limit=${limit}`
  );

  const res = await fetch(`${protocol}://${host}/api/with_sample_data?page=${page}&limit=${limit}`);
  console.log(`getServerSideProps res.status: ${res.status}`);
  const data = await res.json();
  return { props: data };
};

export default IndexWithSampleData;
