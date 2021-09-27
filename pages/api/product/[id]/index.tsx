import nc from 'next-connect';
import Product from '../../../../models/Product';
import db from '../../../../utils/databaseConfig';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const id = await Product.findById({ _id: _req.query.id });
  await db.disconnect();
  res.send(id);
});

export default handler;
