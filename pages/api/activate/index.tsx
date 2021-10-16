import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Users from '../../../models/Users';
import db from '../../../utils/databaseConfig';

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await Users.findOne({ _id: req.query.code });
  if (user && user.code === req.body.codes) {
    user.verify = true;
    user.save();
    await db.disconnect();
    res.send({ message: 'Congratulation Email is verified' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Please check your code' });
  }
});

export default handler;
