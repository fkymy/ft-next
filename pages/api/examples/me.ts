import jwt from 'next-auth/jwt';
import { getSession } from 'next-auth/client';
import { API_URL } from 'utils/constants'
const secret = process.env.SECRET;

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.send({ error: 'You must be sign in to view the protected content on this page.' })
  }

  const token = await jwt.getToken({ req, secret });

  const url = `${API_URL}/v2/me`;

  const ftRes = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token.accessToken}`,
    }
  });

  const profile = await ftRes.json();

  res.send(JSON.stringify(profile, null, 2));
}
