import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';
import { getSession } from 'next-auth/client';

import { API_URL, CURSUS_ID, CAMPUS_ID } from 'utils/constants'
import { CursusUser } from '@interfaces/Cursus';

const secret = process.env.SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error('You must be sign in to view the protected content on this page.')
    }
  
    const token = await jwt.getToken({ req, secret }); 
    if (!token) {
      throw new Error('JWT token is not available.');
    }
  
    let page = parseInt(req.query.page as string) || 1;
    if (page < 1) page = 1;
    const size = parseInt(req.query.limit as string) || 100;
  
    const endpoint = `${API_URL}/v2/cursus/${CURSUS_ID}/cursus_users`;
    const url = endpoint + 
      `?filter[campus_id]=${CAMPUS_ID}` +
      `&sort=-blackholed_at` +
      `&page[size]=${size}` +
      `&page[number]=${page}`;
  
    const ftRes = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token.accessToken}`,
      }
    });

    if (ftRes.status !== 200) {
      throw new Error('Failed to fetch API');
    }
  
    const cursusUsers: CursusUser[] = await ftRes.json();
    // const xPage = parseInt(ftRes.headers.get('x-page') as string);
    // const xPerPage = parseInt(ftRes.headers.get('x-per-page') as string);
    // const xTotal = parseInt(ftRes.headers.get('x-total') as string);
    // const xPageTotal = Math.ceil(xTotal / xPerPage);
    
    res.status(200).json(cursusUsers);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;