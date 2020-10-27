import { NextApiRequest, NextApiResponse } from 'next';
import { sampleCursusUsers } from '@sample-data';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleCursusUsers)) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(sampleCursusUsers);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
