import { ClientCredentials } from 'simple-oauth2';
import { Token } from 'simple-oauth2'
import fs from 'fs';
import path from 'path';

import { BASE_URL } from '@utils/constants';
import { AccessToken } from '@interfaces/Token'

const jsonDir = path.join(process.cwd(), 'utils');

export const getTokenOnce = async (): Promise<AccessToken> => {
  const uid = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;

  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: 'POST',
    body: `grant_type=client_credentials&client_id=${uid}&client_secret=${secret}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  const token: AccessToken = await res.json();
  return token;
};

let tokenJSON: string;

const persistAccessTokenJSON = async (json: string) => {
  console.log(`persisting access token json: ${json}`);
  // Use a file as persistence
  // const fullPath = path.join(jsonDir, 'dontdothis.json');
  // fs.writeFileSync(fullPath, json);
  tokenJSON = json;
}

const getPersistedAccessTokenJSON = async () => {
  console.log(`getting persisted access token json: ${tokenJSON}`);
  // const fullPath = path.join(jsonDir, 'dontdothis.json');
  // const fileContent = fs.readFileSync(fullPath, 'utf8');
  // console.log('getPersistedAccessTokenJSON: ', fileContent);
  return tokenJSON;
}

export const initClient = () => {
  const client = new ClientCredentials({
    client: {
      id: process.env["CLIENT_ID"] as string,
      secret: process.env["CLIENT_SECRET"] as string,
    },
    auth: {
      tokenHost: BASE_URL,
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
  await (persistAccessTokenJSON(JSON.stringify(accessToken)));
  return accessToken;
}

export const getToken = async () => {
  let token: Token;
  const client = initClient();

  const accessTokenJSONString = await getPersistedAccessTokenJSON();
  if (accessTokenJSONString === undefined) {
    console.log('accessTokenJSONString is undefined');
    token = await newToken(client).then(accessToken => {
      return accessToken.token;
    });
  } else {
    let accessToken = client.createToken(JSON.parse(accessTokenJSONString))
    if (accessToken.expired()) {
      console.log('accessToken is expired');
      token = await newToken(client).then(accessToken => {
        return accessToken.token;
      })
    }
    else {
      console.log('accessToken is available');
      token = accessToken.token;
    }
  }
  return token;
}
