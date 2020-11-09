import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUser } from '@sample-data';
import { Profile } from '@interfaces/User';

// Pretend Sample User
export async function getSampleProfile() {
  return sampleUser;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (sampleUser == null) {
      throw new Error(
        'Cannot find sample user data. You must prepare your own sample data at /v2/users/:login'
      );
    }
    console.log(`req.query: ${req.query.id}`);
    const profile: Profile = sampleUser;
    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
