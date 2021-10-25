import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Users from '../../../models/Users';
import { signToken } from '../../../utils/authenticate';
import db from '../../../utils/databaseConfig';

const handler = nc();

handler.post(async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const users = await Users.findOne({ email: _req.body.email });

  if (users) {
    if (bcrypt.compareSync(_req.body.password, users.oldpassword)) {
      await db.disconnect();
      res.send({ message: 'This is your previous password' });
    }
    if (bcrypt.compareSync(_req.body.password, users.password)) {
      if (!users.verify) {
        await db.disconnect();
        res.send({ message: 'Email is not verified', verify: false, id: users._id });
      } else {
        const token = signToken(users);
        res.send({
          token,
          _id: users._id,
          name: users.name,
          email: users.email,
          role: users.role,
          verify: users.verify,
          message: 'Access Granted',
          id: users._id,
        });
        await db.disconnect();
        res.send({ message: 'Access Granted', verify: true, id: users._id });
      }
    }
  } else {
    await db.disconnect();
    res.send({ message: 'Invalid credentials' });
  }
});

export default handler;
