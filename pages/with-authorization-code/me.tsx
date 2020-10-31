import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import Router from 'next/router';

import { API_URL } from 'utils/constants';
import { Profile } from 'interfaces/User';
import Layout from 'components/Layout';
import { hasToken, getToken } from 'lib/authorizationCode';
import { Redirect, serverRedirect } from 'utils/redirects';

const redirect: Redirect = {
  href: '/with-authorization-code',
  asPath: '/with-authorization-code',
  permanent: false
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const isAuthorized = hasToken();
  let profile: Profile | undefined;

  if (isAuthorized) {
    const res = await getToken().then(access_token => {
      return fetch(`${API_URL}/v2/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${access_token}`
        }
      });
    });
    profile = await res.json();

    return {
      props: {
        isAuthorized,
        profile
      }
    }
  } else {
    return serverRedirect(ctx, redirect);
  }
}

type Props = {
  isAuthorized: boolean,
  profile: Profile
};

const MeWithAuthorizationCode = ({ isAuthorized, profile }: Props) => {
  useEffect(() => {
    if (!isAuthorized) {
      const { href, asPath } = redirect;
      Router.push(href, asPath);
    }
  });

  if (!isAuthorized) {
    return <p>Redirecting...</p>;
  } else {
    return (
      <Layout title="with-authorization-code">
        <p>{profile.login}</p>
        <p>{profile.displayname}</p>
        <p>{profile.email}</p>
        <p>{profile.pool_month}</p>
        <p>{profile.pool_year}</p>
        <Link href="/with-authorization-code">
          <a>← Go back</a>
        </Link>
      </Layout>
    )
  }
};

export default MeWithAuthorizationCode;