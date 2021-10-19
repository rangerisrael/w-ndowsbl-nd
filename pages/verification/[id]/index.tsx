/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-lonely-if */
/* eslint-disable import/order */

import React, { useContext, useEffect } from 'react';
import { Button, Grid, ListItem, TextField, Typography, List } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Layout from '../../../components/Layout';
import { getUserByCode, VerifyingUser, RequestNewCode } from '../../../queries/users.queries';
import { useRouter } from 'next/router';
import { Store } from '../../../components/Store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ValidateCode({ users }: any) {
  const router = useRouter();
  const [codes, setCode] = React.useState(null);

  const { state } = useContext(Store);

  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [router, userInfo]);

  const verify = true;
  const randomCode = Math.floor(1000 + Math.random() * 9000);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const codeHandler = async (e: any) => {
    e.preventDefault();
    const coded = Number(codes);
    // eslint-disable-next-line eqeqeq

    // const { data } = await axios.put(`http://localhost:3000/api/activate/${users._id}`, { codes, verify });
    const data = await VerifyingUser(users._id, coded, verify);

    console.log(data);

    console.log(typeof coded);
    console.log(typeof users.code);

    try {
      if (!data.verifyUser.id) {
        // eslint-disable-next-line no-alert
        alert(data.verifyUser.message);
      } else {
        if (users.code === coded) {
          // eslint-disable-next-line no-alert
          alert(data.verifyUser.message);
          router.push('/login');
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line no-alert
      alert(err);
    }
  };

  const newCodeRequestHandler = async () => {
    const data = await RequestNewCode(users._id, randomCode);
    try {
      if (!data.requestCode.id) {
        // eslint-disable-next-line no-alert
        alert(data.requestCode.message);
      } else {
        // eslint-disable-next-line no-alert
        alert(data.requestCode.message);
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
            <form onSubmit={codeHandler}>
              <List>
                <ListItem>
                  <TextField
                    inputProps={{ maxLength: 4, style: { textAlign: 'center' } }}
                    variant="filled"
                    fullWidth
                    id="verified"
                    name="verified"
                    label="Input a valid code"
                    type="number"
                    onInput={(e: any) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 4);
                    }}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </ListItem>

                <ListItem>
                  <Button fullWidth variant="contained" type="submit">
                    Verify Code
                  </Button>
                </ListItem>

                <ListItem>
                  <Button
                    sx={{ display: 'flex', justifyContent: 'flex-end', margin: '0 auto' }}
                    variant="outlined"
                    onClick={newCodeRequestHandler}
                  >
                    Request New Code
                  </Button>
                </ListItem>
              </List>
            </form>
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
