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
  await db.disconnect();

  if (users && bcrypt.compareSync(_req.body.password, users.password)) {
    const token = signToken(users);
    res.send({
      token,
      _id: users._id,
      name: users.name,
      email: users.email,
      role: users.role,
    });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

export default handler;
