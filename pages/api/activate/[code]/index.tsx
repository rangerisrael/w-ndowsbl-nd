import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Users from '../../../../models/Users';
import db from '../../../../utils/databaseConfig';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const users = await Users.findById({ _id: _req.query.code });

  await db.disconnect();

  res.send(users);
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await Users.findById({ _id: req.query.code });
  console.log(req.query.code);
  // eslint-disable-next-line eqeqeq
  if (user && user.code === req.body.codes) {
    user.verify = req.body.verify;
    user.save();
    await db.disconnect();
    res.send({ message: 'Congratulation Email is verified', id: user.id });
  } else {
    await db.disconnect();
    res.send({ message: 'Please check your code', id: '' });
  }
});
export default handler;
