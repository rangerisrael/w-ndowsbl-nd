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
  newUser: string;
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  username: string;
  code: number;
}

// eslint-disable-next-line func-names
const sendConfirmEmail = async ({ newUser, userId, username, code }: UsersEmail) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: newUser,
    subject: 'WindowBlind - Activate Account',
    html: `<h3> Hello ${username} </h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
    <p>You have an option to verify your account</>
    <p>Option 1</p>
    <h2>This is your code</h2>
    <h3>${code}</h3>
    <p>Option 2</p>
    <p>Follow this link to: <a target="_" href="${process.env.LOCAL_URL}/verifyLink/${userId}">Activate your account</a></p>
    <p>By Windowsblind Administrator</p>,
    <p>You received this messages, Cuz you are attempting to register in our platform</p>`,
  };
  await sendMail(message);
};

export default sendConfirmEmail;
