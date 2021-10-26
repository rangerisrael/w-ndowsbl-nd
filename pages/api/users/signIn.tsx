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

  if (users && bcrypt.compareSync(_req.body.password, users.oldpassword)) {
    await db.disconnect();
    res.status(406).send({ message: 'This is your old password' });
  } else if (users && bcrypt.compareSync(_req.body.password, users.password)) {
    if (!users.verify) {
      await db.disconnect();
      res.status(406).send({ message: 'Email is not verified', verify: false, id: users.id });
    } else {
      const token = signToken(users);
      res.status(202).send({
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
    }
  } else {
    await db.disconnect();
    res.status(400).send({ message: 'Invalid credentials' });
  }
});

export default handler;
