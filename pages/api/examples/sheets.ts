import { NextApiRequest, NextApiResponse } from 'next';

import drive from 'drive-db';
import jwt from 'next-auth/jwt';
import { getSession } from 'next-auth/client';

const secret = process.env.SECRET;



async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error('You must be signed in to view the protected content on this page.');
    }

    const token = await jwt.getToken({ req, secret });
    if (!token) {
      throw new Error('JWT token is not available.');
    }

    const db = await drive({
      sheet: '1R1qEfIZDZwkXfqKpCyJZjFtSvEIt9KFUrXHX-3fx_Xs',
      tab: '1',
      cache: 3600
    });

    if (!db) {
      throw new Error('Unable to fetch db.');
    }

    res.status(200).json(db);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;