import { API_URL } from '@utils/constants';
import { AccessToken } from '@interfaces/Token';

export async function getTokenWithCred(): Promise<AccessToken> {
  const uid = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const body = 'grant_type=client_credentials' + `&client_id=${uid}` + `&client_secret=${secret}`;

  const res = await fetch(`${API_URL}/oauth/token`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const token: AccessToken = await res.json();
  return token;
};

export async function getTokenWithCode(code: string): Promise<AccessToken> {
  const uid = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const body =
    'grant_type=authorization_code' +
    `&client_id=${uid}` +
    `&client_secret=${secret}` +
    `&code=${code}` +
    `&redirect_uri=${process.env.SITE}/patterns/with-authorization-code/callback`;

  const resAuth = await fetch(`${API_URL}/oauth/token`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const token: AccessToken = await resAuth.json();

  return token;
};

export async function refreshToken(refreshToken: string) {
  const uid = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const body =
    'grant_type=refresh_token' +
    `&client_id=${uid}` +
    `&client_secret=${secret}` +
    `&refresh_token=${refreshToken}`;

  const resAuth = await fetch(`${API_URL}/oauth/token`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const token = await resAuth.json();
  return token;
}