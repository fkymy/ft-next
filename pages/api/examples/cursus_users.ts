import jwt from 'next-auth/jwt';
import { getSession } from 'next-auth/client';
import { API_URL, CURSUS_ID, CAMPUS_ID } from 'utils/constants'
const secret = process.env.SECRET;

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.send({ error: 'You must be sign in to view the protected content on this page.' })
  }

  const token = await jwt.getToken({ req, secret });

  const url =
    `${API_URL}/v2/cursus/${CURSUS_ID}/cursus_users` +
    `?filter[campus_id]=${CAMPUS_ID}` +
    `&sort=-blackholed_at` +
    `&page[size]=30` +
    `&page[number]=1`;

  const ftRes = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token.accessToken}`,
    }
  });

  const items = await ftRes.json();

  res.send(JSON.stringify(items, null, 2));
}
