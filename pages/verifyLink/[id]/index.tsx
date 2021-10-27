import React, { useContext, useEffect } from 'react';
import { Button, Grid, ListItem, Typography, List } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Layout from '../../../components/Layout';
import { Store } from '../../../components/Store';
import { getUserById, VerifyingUserByLink } from '../../../queries/users.queries';

type MessageType = 'default' | 'error' | 'success' | 'warning' | 'info';

export default function ValidateCode(users: { _id: string; email: string }) {
  const { _id, email } = users;

  const verify = true;
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state } = useContext(Store);

  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [router, userInfo]);

  const handlerMessage = async (statusText: string, status: number, message: string, type: MessageType) => {
    const response = `${statusText} ${status} : ${message}`;
    enqueueSnackbar(response, { variant: type });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const codeHandler = async (e: React.MouseEvent<HTMLElement>) => {
    closeSnackbar();
    e.preventDefault();

    // const { data } = await axios.put(`http://localhost:3000/api/activate/${users._id}`, { codes, verify });
    const verifyLink = await VerifyingUserByLink(_id, verify);
    const { error, verifyUserByLink } = verifyLink;
    const { data, statusText, status } = verifyUserByLink.response ? verifyUserByLink.response : verifyUserByLink;

    console.log(data);

    if (error && !data.id) {
      handlerMessage(data, statusText, status, 'error');
    } else {
      handlerMessage(data, statusText, status, 'success');
      router.push('/login');
    }
  };

  return (
    <Layout titles="email-verification">
      <Grid container>
        <Grid item md={8} xs={12} style={{ margin: '4rem auto' }}>
          <fieldset>
            <legend style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
              {' '}
              Email verification {email}
            </legend>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} component="h2" variant="h2">
              Thank you for registering to our platform
            </Typography>
            <List>
              <ListItem>
                <Button fullWidth variant="contained" onClick={codeHandler}>
                  Click to verify your account
                </Button>
              </ListItem>
            </List>
          </fieldset>
        </Grid>
      </Grid>
    </Layout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext<any>) => {
  // eslint-disable-next-line prefer-destructuring
  const code = context.params.id;

  const userCode = await getUserById(code);
  // const res = await fetch(`http://localhost:3000/api/products/${slug}`);
  // const product = await res.json();

  return {
    props: { users: userCode.userById },
  };
};
