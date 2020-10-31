import { API_URL } from '@utils/constants';
import { AccessToken } from '@interfaces/Token'

// Just fetch once
export const getTokenWithCred = async (): Promise<AccessToken> => {
  const uid = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const body = 'grant_type=client_credentials' +
    `&client_id=${uid}` +
    `&client_secret=${secret}`

  const res = await fetch(`${API_URL}/oauth/token`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  const token: AccessToken = await res.json();
  return token;
};

// Just fetch once
export const getTokenWithCode = async (code: string): Promise<AccessToken> => {
  const uid = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const body = 'grant_type=authorization_code' +
    `&client_id=${uid}` + 
    `&client_secret=${secret}` +
    `&code=${code}` + 
    `&redirect_uri=${process.env.SITE}/with-authorization-code/callback`

  const resAuth = await fetch(`${API_URL}/oauth/token`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  const token: AccessToken = await resAuth.json();

  return token;
};
