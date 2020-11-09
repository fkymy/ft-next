import { AuthorizationCode, AuthorizationTokenConfig } from 'simple-oauth2';
// import { Token } from 'simple-oauth2'
// import fs from 'fs';
// import path from 'path';

import { API_URL } from '@utils/constants';
import { AccessToken } from 'simple-oauth2';

let store: string;
const client = new AuthorizationCode({
  client: {
    id: process.env.CLIENT_ID as string,
    secret: process.env.CLIENT_SECRET as string,
  },
  auth: {
    tokenHost: API_URL,
    tokenPath: '/oauth/token',
    authorizePath: '/oauth/authorize',
  },
});

const storeToken = async (accessToken: AccessToken) => {
  store = JSON.stringify(accessToken);
  console.log('=== STORING TOKEN ===\n', store);
};

const getStoredToken = async () => {
  console.log('=== GETTING STORED TOKEN ===\n', store);
  const accessToken = client.createToken(JSON.parse(store));
  return accessToken;
};

export const getAuthorizeURL = () => {
  return client.authorizeURL({
    redirect_uri: `${process.env.SITE}/patterns/with-authorization-code/callback`,
    scope: 'public',
    state: 'test-state',
  });
};

export const hasToken = () => {
  return store !== undefined;
};

export const initToken = async (code: string, state: string) => {
  if (!state) {
    throw new Error('state not found');
  }

  const options: AuthorizationTokenConfig = {
    code: code,
    redirect_uri: `${process.env.SITE}/patterns/with-authorization-code/callback`,
  };

  const accessToken = await client.getToken(options as AuthorizationTokenConfig);
  await storeToken(accessToken);
};

const EXPIRATION_WINDOW_IN_SECONDS = 300;

export const getToken = async () => {
  let token: string;
  let accessToken = await getStoredToken();

  if (accessToken.expired(EXPIRATION_WINDOW_IN_SECONDS)) {
    console.log('accessToken is expired');
    accessToken = await accessToken.refresh();
    console.log('ACCESS TOKEN REFRESHED: ', accessToken);
    await storeToken(accessToken);
    token = accessToken.token.access_token;
  } else {
    token = accessToken.token.access_token;
  }

  return token;
};

export const revokeToken = () => {
  console.log('revoke!');
};
