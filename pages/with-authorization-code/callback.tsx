import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { browserRedirect, serverRedirect, Redirect } from '@utils/redirects';
import { initToken } from '@lib/authorizationCode';

const redirect: Redirect = {
  href: '/with-authorization-code',
  asPath: '/with-authorization-code',
  permanent: false
}

export default browserRedirect(redirect);

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { code, state } = ctx.query;
  console.log(JSON.stringify(ctx.query));

  if (code && state) {
    await initToken(code as string, state as string);
  } else {
    console.log('code and state is not available');
  }

  return serverRedirect(ctx, redirect);
}
