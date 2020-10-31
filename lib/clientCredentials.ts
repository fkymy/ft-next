import { ClientCredentials } from 'simple-oauth2';
import fs from 'fs';
import path from 'path';

import { API_URL } from '@utils/constants';

// Globals (Fake Persistence)
const jsonDir = path.join(process.cwd(), 'utils');
let store: string;

const client = new ClientCredentials({
  client: {
    id: process.env["CLIENT_ID"] as string,
    secret: process.env["CLIENT_SECRET"] as string,
  },
  auth: {
    tokenHost: API_URL,
    tokenPath: '/oauth/token',
  }
});

const storeToken = async (accessToken: string) => {
  console.log(`persisting access token json: ${accessToken}`);
  // const fullPath = path.join(jsonDir, 'dontdothis.json');
  // fs.writeFileSync(fullPath, json);
  store = accessToken;
}

const getStoredToken = async () => {
  console.log(`getting persisted access token json: ${store}`);
  // const fullPath = path.join(jsonDir, 'dontdothis.json');
  // const fileContent = fs.readFileSync(fullPath, 'utf8');
  // console.log('getPersistedAccessTokenJSON: ', fileContent);
  return store;
}

export const initClient = () => {
  const client = new ClientCredentials({
    client: {
      id: process.env["CLIENT_ID"] as string,
      secret: process.env["CLIENT_SECRET"] as string,
    },
    auth: {
      tokenHost: API_URL,
      tokenPath: '/oauth/token',
    }
  });

  return client;
}

const newToken = async (client: ClientCredentials) => {
  const tokenParams = {
    scope: 'public'
  };

  // todo: how do you catch failure in async func?
  const accessToken = await client.getToken(tokenParams);
  console.log('newToken fetched: ', JSON.stringify(accessToken));
  await (storeToken(JSON.stringify(accessToken)));
  return accessToken;
}

export const getToken = async () => {
  let token: string;

  const storedToken = await getStoredToken();
  if (storedToken === undefined) {
    console.log('storedToken is undefined');
    token = await newToken(client).then(accessToken => {
      return accessToken.token.access_token;
    });
  } else {
    let accessToken = client.createToken(JSON.parse(storedToken))
    if (accessToken.expired()) {
      console.log('accessToken is expired');
      token = await newToken(client).then(accessToken => {
        return accessToken.token.access_token;
      })
    }
    else {
      console.log('accessToken is available');
      token = accessToken.token.access_token;
    }
  }
  return token;
}
