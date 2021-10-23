import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const smtpConfig: SMTPTransport.Options = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,

  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
  },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendMail = async (message: any) => {
  const transporter = nodemailer.createTransport(smtpConfig);
  await transporter.sendMail(message);
};

// 3. Message configuration

// Commmon fields

interface UsersEmail {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestUser: string;
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  username: string;
}

// eslint-disable-next-line func-names
const sendPasswordLink = async ({ requestUser, userId, username }: UsersEmail) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: requestUser,
    subject: 'WindowBlind - Request Password',
    html: `<h3> Hello ${username} </h3>
    <p>Requested Password</p>
    <p>Follow this link to: <a target="_" href="${process.env.LOCAL_URL}/new-password/${userId}">Reset Password</a></p>
    <p>By Windowsblind Administrator</p>,
    <p>You received this messages, Cuz you are attempting to request new password in your account</p>`,
  };
  await sendMail(message);
};

export default sendPasswordLink;
