import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Users from '../../../../models/Users';
import { signToken } from '../../../../utils/authenticate';
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

  if (user.verify === true) {
    if (user && user.code === req.body.codes) {
      await db.disconnect();
      res.send({ message: 'Email is already verified', id: user._id });
    } else {
      if (req.body.codes === 0) {
        await db.disconnect();
        res.send({ message: 'Input a valid code first', id: '' });
      }
      await db.disconnect();
      res.send({ message: 'Please check your code', id: '' });
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (user && user.code === req.body.codes) {
      user.verify = req.body.verify;
      user.save();
      await db.disconnect();
      const token = signToken(user);
      res.send({
        token,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verify: user.verify,
        message: 'Congratulation Email is verified',
      });
    } else {
      if (req.body.codes === 0) {
        await db.disconnect();
        res.send({ message: 'Input a valid code first', id: '' });
      }
      await db.disconnect();
      res.send({ message: 'Please check your code', id: '' });
    }
  }
});
export default handler;
