/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, List, ListItem, TextField, Typography, Grid, Link } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { RegisterUser } from '../../queries/users.queries';

export default function RegisterUsers() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitRequest = async (e: any) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await RegisterUser(name, email, password);

    console.log(data);

    try {
      if (data.registerUser.id === '') {
        // eslint-disable-next-line no-alert
        alert(data.registerUser.message);
      } else {
        // eslint-disable-next-line no-alert
        alert(data.registerUser.message);
        router.push(`/verification/${data.registerUser.id}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line no-alert
      alert(err);
    }
  };
  return (
    <Layout titles="Register">
      <Grid container>
        <Grid item md={8} xs={12} style={{ margin: '2rem auto' }}>
          {' '}
          <fieldset>
            <legend style={{ textAlign: 'center' }}>
              <Typography variant="h1" component="h1">
                SignUp
              </Typography>
            </legend>
            <form onSubmit={submitRequest}>
              <List>
                <ListItem>
                  <TextField
                    variant="filled"
                    fullWidth
                    id="username"
                    name="username"
                    label="Full Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    variant="filled"
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    variant="filled"
                    fullWidth
                    id="password"
                    name="password"
                    label="Passsword"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Button fullWidth variant="contained" type="submit">
                    Register
                  </Button>
                </ListItem>
                <ListItem>
                  Already have an account ? &nbsp;
                  <NextLink href="/login" passHref>
                    <Link>Login</Link>
                  </NextLink>
                </ListItem>
              </List>
            </form>
          </fieldset>
        </Grid>
      </Grid>
    </Layout>
  );
}
