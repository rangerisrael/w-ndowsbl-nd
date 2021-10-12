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

  if (user) {
    res.send({ message: 'User already exist' });
  } else {
    const newUser = await new Users();
    newUser.name = _req.body.name;
    newUser.email = _req.body.email;
    newUser.verify = false;
    newUser.password = bcrypt.hashSync(_req.body.password);
    newUser.role = Roles.buyer;

    // await sendConfirmEmail({
    //   newUser: _req.body.email,
    //   userId: newUser._id,
    //   username: _req.body.name,
    // });

    // eslint-disable-next-line spaced-comment
    newUser.save();

    res.send({ message: 'User created successfully' });

    await db.disconnect();
  }
});

export default handler;
