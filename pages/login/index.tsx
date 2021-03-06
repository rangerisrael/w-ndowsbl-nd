/* eslint-disable no-shadow */
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
import { useSnackbar } from 'notistack';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import BreakPoint from '../../components/ui-component/Breakpoint';
import { LoginUser } from '../../queries/users.queries';

type FormValues = {
  email: string;
  password: string;
};

type MessageType = 'default' | 'error' | 'success' | 'warning' | 'info';

export default function Login() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const { redirect } = router.query; // login?redirect=/shipping

  console.log(redirect);

  const { state, dispatch } = useContext(Store);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { userInfo } = state;

  useEffect(() => {
    if (userInfo && !redirect) {
      router.push('/');
    } else if (userInfo && redirect) {
      router.push('/shipping');
    }
  }, [redirect, router, userInfo]);

  const handlerMessage = async (statusText: string, status: number, message: string, type: MessageType) => {
    const response = `${statusText} ${status} : ${message}`;
    enqueueSnackbar(response, { variant: type });
  };

  const submitRequest: SubmitHandler<FormValues> = async (formData) => {
    closeSnackbar();
    const user = await LoginUser(formData.email, formData.password);

    const { error, loginUser } = user;
    const { data, statusText, status } = loginUser.response ? loginUser.response : loginUser;

    if (error && !data.id) {
      console.log(data);
      handlerMessage(statusText, status, data.message, 'error');
    } else if (error && data.id && !data.verify) {
      console.log(data);
      handlerMessage(statusText, status, data.message, 'error');
      router.push(`/verification/${data.id}`);
    } else {
      console.log(loginUser);
      handlerMessage(statusText, status, data.message, 'success');
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(`${redirect || '/'}`);
    }
  };

  //  React.FormEvent<HTMLFormElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const googleHandler = async (e: React.MouseEvent<HTMLElement>) => {
    /// router.push(`${redirect || '/'}`);
    e.preventDefault();
    await signIn('google', {
      callbackUrl: `${process.env.LOCAL_URL}`,
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const facebookHandler = async (e: React.MouseEvent<HTMLElement>) => {
    // router.push(`${redirect || '/'}`);
    e.preventDefault();
    await signIn('facebook', {
      callbackUrl: `${process.env.LOCAL_URL}`,
    });
  };

  return (
    <Layout titles="Login">
      <BreakPoint>
        <Grid container>
          <Grid className="md-center" item md={8} xs={12}>
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
                        pattern: /^([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)\@(?:gmail|mailinator)([\.])(?:com)$/,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="filled"
                          fullWidth
                          id="email"
                          name="email"
                          label="Email e.g. xxxxx@gmail.com | xxxxx@mailinator.com"
                          inputProps={{ type: 'email', style: { textAlign: 'center' } }}
                          error={Boolean(errors.email)}
                          helperText={
                            <span style={{ color: '#FF0000' }}>
                              {errors.email
                                ? errors.email.type === 'pattern'
                                  ? 'We must accepted gmail or mailinator account only e.g.(xxxxx@gmail.com|xxxxx@mailinator.com)'
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
                          inputProps={{ type: 'password', style: { textAlign: 'center' } }}
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
                                  : 'Password is required'
                                : ''}
                            </span>
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>

                  <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <NextLink href="/request-password" passHref>
                      <Link>
                        <Typography>Forgot Password</Typography>
                      </Link>
                    </NextLink>
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
                          <Link onClick={googleHandler}>
                            <Grid container>
                              <Grid item md={2} xs={2}>
                                {' '}
                                <GoogleIcon sx={{ width: '50px' }} />
                              </Grid>
                              <Grid item md={5} xs={8}>
                                {' '}
                                <Typography className="button-signIn">Sign in with Google</Typography>
                              </Grid>
                            </Grid>
                          </Link>
                        </NextLink>
                      </Grid>
                      <Grid item md={6} xs={5}>
                        <NextLink href="/api/auth/signin" passHref>
                          <Link onClick={facebookHandler}>
                            <Grid container>
                              <Grid item md={2} xs={3}>
                                {' '}
                                <FacebookIcon sx={{ width: '50px' }} />
                              </Grid>
                              <Grid item md={5} xs={5}>
                                {' '}
                                <Typography className="button-signIn">Facebook</Typography>
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
      </BreakPoint>
    </Layout>
  );
}
