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
    res.send({ message: 'Email is already verified', id: user._id });
  } else {
    // eslint-disable-next-line no-lonely-if
    if (user && req.body.verify) {
      user.verify = req.body.verify;
      user.markModified('verify');
      await user.save();
      await db.disconnect();
      const token = signToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verify: user.verify,
        message: 'Congratulation Email is verified',
      });
    } else if (user && req.body.randomCode) {
      user.code = req.body.randomCode;
      user.markModified('code');
      await user.save();

      await sendConfirmEmail({
        newUser: user.email,
        userId: user._id,
        username: user.name,
        code: req.body.randomCode,
      });

      await db.disconnect();
      res.send({ message: 'Successfully created, Code must be sent in your email address', id: user._id });
    } else {
      res.send({ message: 'Server Error:UnAuthorized request' });
    }
  }
});
export default handler;
