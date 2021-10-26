import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Users from '../../../../models/Users';
import db from '../../../../utils/databaseConfig';
import sendPasswordLink from '../../../../utils/verifyPassword';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await Users.findOne({ email: _req.query.id });

  if (user) {
    await sendPasswordLink({
      requestUser: user.email,
      userId: user._id,
      username: user.name,
    });
    await db.disconnect();
    res.status(202).send({
      message: `Congratulation new password delivered in your email address ${user.email}`,
      id: user._id,
    });
  } else {
    await db.disconnect();
    res.status(400).send({ message: 'Invalid credentials' });
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await Users.findById({ _id: req.query.id });
  console.log(req.query.code);

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.oldpassword)) {
      await db.disconnect();
      res.status(406).send({ message: 'This is your previous password' });
    } else if (bcrypt.compareSync(req.body.password, user.password)) {
      await db.disconnect();
      res.status(406).send({ message: 'Password is same as before' });
    } else {
      user.oldpassword = user.password;
      user.password = bcrypt.hashSync(req.body.password);
      await user.save();

      await db.disconnect();
      res.status(202).send({ message: 'Password successfully change', id: user._id, email: user.email });
    }
  }
});
export default handler;
