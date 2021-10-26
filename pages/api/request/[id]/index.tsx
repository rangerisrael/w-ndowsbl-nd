import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Users from '../../../../models/Users';
import { signToken } from '../../../../utils/authenticate';
import db from '../../../../utils/databaseConfig';
import sendConfirmEmail from '../../../../utils/verifyEmail';

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await Users.findById({ _id: req.query.id });
  console.log(user._id);
  // eslint-disable-next-line eqeqeq

  if (user && user.verify === true) {
    await db.disconnect();
    res.status(406).send({ message: 'Email is already verified' });
  } else {
    // eslint-disable-next-line no-lonely-if
    if (user && req.body.verify) {
      user.verify = req.body.verify;
      await user.save();
      await db.disconnect();
      const token = signToken(user);
      res.status(201).send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verify: user.verify,
        message: 'Congratulation Email is verified',
        id: user._id,
      });
    } else if (user && req.body.randomCode) {
      if (!sendConfirmEmail) {
        res.status(401).send({ message: 'Email is not delivered' });
      } else {
        user.code = req.body.randomCode;
        await user.save();

        await sendConfirmEmail({
          newUser: user.email,
          userId: user._id,
          username: user.name,
          code: req.body.randomCode,
        });

        await db.disconnect();
        res.status(201).send({
          message: `Successfully created, Code must be sent in your email address ${user.email}`,
          id: user._id,
        });
      }
    } else {
      res.status(401).send({ message: 'Invalid Credentials' });
    }
  }
});
export default handler;
