/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Users from '../../../models/Users';
import db from '../../../utils/databaseConfig';
// eslint-disable-next-line import/default
import sendConfirmEmail from '../../../utils/verifyEmail';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const user = await Users.findOne({ email: req.body.email });

  if (!user) {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newUser = new Users();
    // eslint-disable-next-line no-unused-expressions
    newUser._id instanceof mongoose.Types.ObjectId;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = bcrypt.hashSync(req.body.password);
    newUser.oldpassword = 'null';
    newUser.code = randomCode;

    await sendConfirmEmail({
      newUser: newUser.email,
      userId: newUser._id,
      username: newUser.name,
      code: randomCode,
    });

    console.log(newUser._id);
    // eslint-disable-next-line no-shadow
    await newUser.save();

    await db.disconnect();
    res.send({ message: 'User created successfully', id: newUser._id });
  } else {
    await db.disconnect();
    res.send({ message: 'User already exist' });
  }
});

export default handler;
