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
    const newUser = await new Users();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    newUser._id = new mongoose.Schema.Type.ObjectId();
    newUser.name = _req.body.name;
    newUser.email = _req.body.email;
    newUser.verify = false;
    newUser.password = bcrypt.hashSync(_req.body.password);
    newUser.role = Roles.buyer;
    newUser.code = randomCode;

    console.log(newUser);

    await sendConfirmEmail({
      newUser: newUser.email,
      userId: newUser._id,
      username: newUser.name,
      code: newUser.code,
    });

    newUser.save();

    await db.disconnect();
    res.send({ message: 'User created successfully', id: newUser._id });
  } else {
    await db.disconnect();
    res.send({ message: 'User already exist', id: '' });
  }
});

export default handler;
