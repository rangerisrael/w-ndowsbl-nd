/* eslint-disable spaced-comment */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, List, ListItem, TextField, Typography, Grid, Link } from '@mui/material';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import { LoginUser } from '../../queries/users.queries';

export default function Login() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { redirect } = router.query; // login?redirect=/shipping

  console.log(redirect);

  const { state, dispatch } = useContext(Store);

  const { userInfo } = state;

  useEffect(() => {
    if (userInfo && !redirect) {
      router.push('/');
    }
  }, [redirect, router, userInfo]);

  const submitRequest = async (email: any, password: any) => {
    try {
      const data = await LoginUser(email, password);
      alert('sign in sucees');
      dispatch({ type: 'USER_LOGIN', payload: data.loginUser });
      Cookies.set('userInfo', JSON.stringify(data.loginUser));
      router.push(`${redirect || '/'}`);
    } catch (err: any) {
      alert(err.response.data ? err.response.data.loginUser.message : err.loginUser.message);
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
            <form onSubmit={handleSubmit(submitRequest)}>
              <List>
                <ListItem>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)\@(?:gmail)([\.])(?:com)$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="filled"
                        fullWidth
                        id="email"
                        name="email"
                        label="Email xxxxx@gmail.com"
                        inputProps={{ type: 'email' }}
                        error={Boolean(errors.email)}
                        helperText={
                          <span style={{ color: '#FF0000' }}>
                            {errors.email
                              ? errors.email.type === 'pattern'
                                ? 'We must accepted gmail account only e.g.(xxxxx@gmail.com)'
                                : 'Email is required'
                              : ''}
                          </span>
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                <ListItem>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 6,
                      validate: {
                        upperCase: (value) => /[A-Z]/.test(value),
                        lowerCase: (value) => /[a-z]/.test(value),
                        digit: (value) => /[0-9]/.test(value),
                        specialChar: (value) => /[#?!@$^&*-]/.test(value),
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="filled"
                        fullWidth
                        id="password"
                        name="password"
                        label="Password e.g. #PassWord@2021"
                        inputProps={{ type: 'password' }}
                        error={Boolean(errors.password)}
                        helperText={
                          <span style={{ color: '#FF0000' }}>
                            {errors.password
                              ? errors.password.type === 'minLength'
                                ? 'Password length is more than five'
                                : errors.password.type === 'upperCase'
                                ? 'Password must be at least one uppercase (A-Z)'
                                : errors.password.type === 'lowerCase'
                                ? 'Password must be at least one lowercase letter(a-z)'
                                : errors.password.type === 'digit'
                                ? 'Password must be at least one digit (0-9)'
                                : errors.password.type === 'specialChar'
                                ? 'Password must be at least one special character (#?!@$^&*-)'
                                : errors.password.required
                                ? 'Password is required'
                                : 'Password is required'
                              : ''}
                          </span>
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                <ListItem>
                  <Button fullWidth variant="contained" type="submit">
                    Login
                  </Button>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Grid container>
                    <Grid item md={6} xs={7}>
                      <NextLink href="/api/auth/signin" passHref>
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            signIn('google', {
                              callbackUrl: `${process.env.LOCAL_URL}`,
                            });
                          }}
                        >
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
                        </Link>
                      </NextLink>
                    </Grid>
                    <Grid item md={6} xs={5}>
                      <NextLink href="/api/auth/signin" passHref>
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            signIn('facebook', {
                              callbackUrl: `${process.env.LOCAL_URL}`,
                            });
                          }}
                        >
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
                        </Link>
                      </NextLink>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  Don't have an account ? &nbsp;
                  <NextLink as="xxxsaddkasdkhasdksdasdskdasdsad" href="/register" passHref>
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
