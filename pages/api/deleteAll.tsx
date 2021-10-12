import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import db from '../../utils/databaseConfig';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  await db.deleteAllUser();

  await db.disconnect();
  res.send({ message: 'seeder deleted successfully' });
});

export default handler;
