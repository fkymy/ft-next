import { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'next-auth/jwt';
import { getSession } from 'next-auth/client';
import { API_URL } from 'utils/constants'
const secret = process.env.SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error('You must be signed in to view the protected content on this page.')
    }
  
    const token = await jwt.getToken({ req, secret }); 
    if (!token) {
      throw new Error('JWT token is not available.');
    }

    console.log(req.query);

    // TODO: token expired?
    const endpoint = `${API_URL}/v2/${req.query.endpoint}`;
    const ftRes = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token.accessToken}`,
      }
    });

    if (ftRes.status !== 200) {
      throw new Error('Failed to fetch API');
    }

    const json = await ftRes.json();
    res.send(JSON.stringify(json, null, 2));

  } catch (err) {
    res.send({ message: err.message });
  }
}

export default handler;