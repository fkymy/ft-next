import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { BASE_URL } from '@utils/constants';
import { Profile } from '@interfaces/User';
import Layout from '@components/Layout';
import { getToken } from '@lib/clientCredentials';

type Params = {
  params: {
    login: string
  }
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const login = params.login;
  const res = await getToken().then(token => {
    console.log('getServerSideProps token: ', token);
    return fetch(`${BASE_URL}/v2/users/${login}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token.access_token}`
      }
    });
  });
  console.log(`getServerSideProps res ${JSON.stringify(res.headers)}`)
  const profile: Profile = await res.json();

  return {
    props: {
      profile
    }
  }
}

type Props = {
  profile: Profile
};

const ProfileWithClientCredentials = ({ profile }: Props) => (
  <Layout title="with-client-credentials">
    <p>{profile.login}</p>
    <p>{profile.displayname}</p>
    <p>{profile.email}</p>
    <p>{profile.pool_month}</p>
    <p>{profile.pool_year}</p>
    <Link href="/with-client-credentials">
      <a>← Go back</a>
    </Link>
  </Layout>
);

export default ProfileWithClientCredentials;
