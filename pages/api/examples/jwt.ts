import jwt from 'next-auth/jwt';

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  console.log('EXAMPLES JWT: ', token);
  res.send(JSON.stringify(token));
}