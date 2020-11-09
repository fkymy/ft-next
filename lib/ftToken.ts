import { AuthorizationCode } from 'simple-oauth2';
import { AccessToken } from 'simple-oauth2';
import { API_URL } from '@utils/constants';

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

const FT_EXPIRES_IN_SECONDS = 7200;
const FT_EXPIRATION_WINDOW_IN_SECONDS = 300;

export const calcExpiresAt = (expiresIn: number = FT_EXPIRES_IN_SECONDS) => {
  return Date.now() + expiresIn * 1000;
}

export const calcExpiresIn = (expiresAt: number) => {
  return expiresAt - (Date.now() + FT_EXPIRATION_WINDOW_IN_SECONDS * 1000);
}

export const ftTokenIsExpired = (expiresAt: number) => {
  return calcExpiresIn(expiresAt) <= 0;
}

export const ftTokenRefresh = async (
  accessToken: string,
  refreshToken: string,
  expiresIn: string
) => {
  const obj = {
    "access_token": accessToken,
    "token_type": "Bearer",
    "expires_in": expiresIn,
    "refresh_token": refreshToken
  }

  let token: AccessToken = client.createToken(obj);
  console.log('CREATED: ', JSON.stringify(token));
  console.log(token.expired(FT_EXPIRATION_WINDOW_IN_SECONDS) ? 'CREATED IS EXPIRED!' : 'CREATED IS NOT EXPIRED...');
  token = await token.refresh();

  return token;
}

// TODO: revokeToken()
