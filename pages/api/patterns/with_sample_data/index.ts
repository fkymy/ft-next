import { NextApiRequest, NextApiResponse } from 'next';
import { sampleCursusUsers } from '@sample-data-example';
import { CursusUser } from '@interfaces/Cursus';

// Pretended Server Side Props
export async function getSampleData() {
  return sampleCursusUsers;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleCursusUsers)) {
      throw new Error(
        'Cannot find sample cursus user data. You must prepare your own sample data at /v2/cursus/:cursus_id/cursus_user'
      );
    }
    let page = parseInt(req.query.page as string) || 1;
    if (page < 1) page = 1;
    const limit = parseInt(req.query.limit as string) || 100;

    const start = page == 1 ? 0 : (page - 1) * limit;
    const end = page == 1 ? limit : page * limit;
    console.log(`start: ${start}, end: ${end}`);

    const items: CursusUser[] = sampleCursusUsers.slice(start, end);
    const pageCount = Math.ceil(sampleCursusUsers.length / 100);
    console.log(
      `page: ${page}, limit: ${limit} sample.length: ${sampleCursusUsers.length}, items.length: ${items.length} pageCount: ${pageCount}`
    );

    res.status(200).json({ items, pageCount, page });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
