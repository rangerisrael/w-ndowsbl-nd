/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-lonely-if */
/* eslint-disable import/order */

import React, { useContext, useEffect } from 'react';
import { Button, Grid, ListItem, Typography, List } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Layout from '../../../components/Layout';
import { getUserByCode, VerifyingUserByLink } from '../../../queries/users.queries';
import { useRouter } from 'next/router';
import { Store } from '../../../components/Store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ValidateCode({ users }: any) {
  const verify = true;
  const router = useRouter();

  const { state } = useContext(Store);

  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [router, userInfo]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const codeHandler = async (e: any) => {
    e.preventDefault();

    // eslint-disable-next-line eqeqeq

    // const { data } = await axios.put(`http://localhost:3000/api/activate/${users._id}`, { codes, verify });
    const data = await VerifyingUserByLink(users._id, verify);

    console.log(data);

    try {
      if (!users._id) {
        // eslint-disable-next-line no-alert
        alert(data.verifyUserByLink.message);
      } else {
        // eslint-disable-next-line no-alert
        alert(data.verifyUserByLink.message);
        router.push('/login');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line no-alert
      alert(err);
    }
  };

  return (
    <Layout titles="email-verification">
      <Grid container>
        <Grid item md={8} xs={12} style={{ margin: '4rem auto' }}>
          <fieldset>
            <legend style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
              {' '}
              Email verification {users.email}
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

  const userCode = await getUserByCode(code);
  // const res = await fetch(`http://localhost:3000/api/products/${slug}`);
  // const product = await res.json();

  return {
    props: { users: userCode.usercode },
  };
};
