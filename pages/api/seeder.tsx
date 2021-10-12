import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Product from '../../models/Product';
import Users from '../../models/Users';
import data from '../../utils/data';
import db from '../../utils/databaseConfig';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const deleteItem = [Users.deleteMany({}), Product.deleteMany({})];
  const insertItem = [Users.insertMany(data.users), Product.insertMany(data.products)];

  const deleted = deleteItem.map((x) => {
    return x;
  });
  const inserted = insertItem.map((y) => {
    return y;
  });
  await deleted;
  await inserted;
  await db.disconnect();
  res.send({ message: 'seeded created successfully' });
});

export default handler;
