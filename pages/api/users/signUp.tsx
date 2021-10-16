/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Roles } from '../../../models/interface/Users';
import Users from '../../../models/Users';
import db from '../../../utils/databaseConfig';
// eslint-disable-next-line import/default
import sendConfirmEmail from '../../../utils/verifyEmail';

const handler = nc();

handler.post(async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const user = await Users.findOne({ email: _req.body.email });

  if (!user) {
    const newUser = await new Users();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    // eslint-disable-next-line no-unused-expressions
    newUser.name = _req.body.name;
    newUser.email = _req.body.email;
    newUser.verify = false;
    newUser.password = bcrypt.hashSync(_req.body.password);
    newUser.role = Roles.buyer;
    newUser.code = randomCode;

    await sendConfirmEmail({
      newUser: newUser.email,
      userId: newUser._id,
      username: newUser.name,
      code: newUser.code,
    });

    newUser.save();
    res.send({ message: 'User created successfully', id: newUser.id });
  } else {
    res.send({ message: 'User already exist', id: '' });
  }

  await db.disconnect();
});

export default handler;
