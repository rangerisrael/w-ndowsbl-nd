/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
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
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newUser = await new Users({
      name: _req.body.name,
      email: _req.body.email,
      verify: false,
      password: bcrypt.hashSync(_req.body.password),
      role: Roles.buyer,
      code: randomCode,
    });

    // eslint-disable-next-line no-unused-expressions
    // newUser._id instanceof mongoose.Types.ObjectId;

    // eslint-disable-next-line no-unused-expressions
    newUser._id instanceof mongoose.Types.ObjectId;
    await sendConfirmEmail({
      newUser: newUser.email,
      userId: newUser.id,
      username: newUser.name,
      code: newUser.code,
    });
    console.log(newUser.id);
    // eslint-disable-next-line no-shadow
    newUser.save(async (err: any, user: any) => {
      if (err) {
        console.log(err);
      }
      if (user) {
        console.log(user);
      }
    });
    await db.disconnect();
    res.send({ message: 'User created successfully', id: newUser.id });
  } else {
    await db.disconnect();
    res.send({ message: 'User already exist', id: '' });
  }
});

export default handler;
