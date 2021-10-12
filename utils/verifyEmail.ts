import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const smtpConfig: SMTPTransport.Options = {
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
  },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sendMail(message: any) {
  return new Promise((_req, res) => {
    const transporter = nodemailer.createTransport(smtpConfig);

    // eslint-disable-next-line func-names
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line func-names
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transporter.sendMail(message, (err: any, info: any) => {
      if (err) {
        _req(err);
      } else {
        res(info);
      }
    });
  });
}

// 3. Message configuration

// Commmon fields

interface UsersEmail {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newUser: any;
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  username: any;
}

// eslint-disable-next-line func-names
const sendConfirmEmail = function ({ newUser, userId, username }: UsersEmail) {
  const message: Mail.Options = {
    from: process.env.GOOGLE_USER,
    to: newUser,
    subject: 'WindowBlind - Activate Account',
    html: `<h3> Hello ${username} </h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="${process.env.LOCAL_URL}/api/activate/user/${userId}">${process.env.LOCAL_URL}active</a></p>
      <p>Cheers</p>
      <p>Your Application Team</p>`,
  };
  return sendMail(message);
};

export default sendConfirmEmail;
