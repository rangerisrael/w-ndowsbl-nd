/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, List, ListItem, TextField, Typography, Grid, Link } from '@mui/material';
import axios from 'axios';
import NextLink from 'next/link';
import Layout from '../../components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitRequest = async (e) => {
    e.preventDefault();

    try {
      const { request } = await axios.post('/api/users/signIn', { email, password });
      alert('sign in sucees');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout titles="Login">
      <Grid container>
        <Grid item md={8} xs={12} style={{ margin: '2rem auto' }}>
          {' '}
          <fieldset>
            <legend style={{ textAlign: 'center' }}>
              <Typography variant="h1" component="h1">
                Login
              </Typography>
            </legend>
            <form onSubmit={submitRequest}>
              <List>
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
                    Login
                  </Button>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Grid container>
                    <Grid item md={6} xs={7}>
                      <Grid container>
                        <Grid item md={2} xs={2}>
                          {' '}
                          <GoogleIcon sx={{ width: '50px' }} />
                        </Grid>
                        <Grid item md={5} xs={8}>
                          {' '}
                          <Typography>Sign in with Google</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={6} xs={5}>
                      <Grid container>
                        <Grid item md={2} xs={3}>
                          {' '}
                          <FacebookIcon sx={{ width: '50px' }} />
                        </Grid>
                        <Grid item md={5} xs={5}>
                          {' '}
                          <Typography>Facebook</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  Don't have an account ? &nbsp;
                  <NextLink href="/signup" passHref>
                    <Link>Register</Link>
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
