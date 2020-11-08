import { GetServerSideProps } from 'next';

import Link from 'next/link';
import { Profile } from '@interfaces/User';
import Layout from '@components/Layout';

type Props = {
  profile: Profile;
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const dev = process.env.NODE_ENV !== 'production';
  const protocol = dev ? 'http' : req.headers['x-forwarded-proto'];
  const host = dev ? 'localhost:3000' : req.headers['x-forwarded-host'];
  console.log(`getServerSideProps with query: ${JSON.stringify(query)}`);
  console.log(
    `getServerSideProps calling: ${protocol}://${host}/api/with_sample_data/profile?id=${query.id}`
  );

  const res = await fetch(`${protocol}://${host}/api/with_sample_data/profile?id=${query.id}`);
  console.log(`getServerSideProps res.status: ${res.status}`);
  const data = await res.json();
  return { props: data };
};

const ProfileWithSampleData = ({ profile }: Props) => (
  <Layout title="with-sample-data">
    <p>{profile.login}</p>
    <p>{profile.displayname}</p>
    <p>{profile.email}</p>
    <p>{profile.pool_month}</p>
    <p>{profile.pool_year}</p>
    <Link href="/with-sample-data">
      <a>← Go back</a>
    </Link>
  </Layout>
);

export default ProfileWithSampleData;
