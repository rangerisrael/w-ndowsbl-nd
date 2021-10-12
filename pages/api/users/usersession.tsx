import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import nc from 'next-connect';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession();


    res.send(JSON.stringify(session, null, 2));

 
});

export default handler;
