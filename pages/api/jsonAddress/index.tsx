import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Users from '../../../models/Users';
import db from '../../../utils/databaseConfig';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const users = await Users.find({});
  await db.disconnect();
  res.send(users);
});

export default handler;
