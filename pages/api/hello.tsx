/* eslint-disable import/namespace */
/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/databaseConfig';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  await db.disconnect();

  res.status(200).json({ name: 'John Doe' });
};
