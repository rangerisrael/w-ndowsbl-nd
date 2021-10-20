/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Button, List, ListItem, TextField, Typography, Grid, Link } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Layout from '../../components/Layout';
import { RegisterUser } from '../../queries/users.queries';

type FormValues = {
  fullname: string;
  email: string;
  password: string;
};

export default function RegisterUsers() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const submitRequest: SubmitHandler<FormValues> = async (data) => {
    closeSnackbar();
    try {
      const user = await RegisterUser(data.fullname, data.email, data.password);

      console.log(user);
      if (!user.registerUser.id) {
        // eslint-disable-next-line no-alert
        enqueueSnackbar(user.registerUser.message, { variant: 'error' });
      } else {
        // eslint-disable-next-line no-alert
        enqueueSnackbar(user.registerUser.message, { variant: 'success' });
        router.push(`/verification/${user.registerUser.id}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line no-alert
      enqueueSnackbar(err, { variant: 'error' });
    }
  };
  // eslint-disable-next-line no-alert

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const submitRequest = async (fullname: any, email: any, password: any) => {
  //   try {
  //     const data = await RegisterUser(fullname, email, password);

  //     console.log(data);
  //     if (data.registerUser.id === '') {
  //       // eslint-disable-next-line no-alert
  //       alert(data.registerUser.message);
  //     } else {
  //       // eslint-disable-next-line no-alert
  //       alert(data.registerUser.message);
  //       router.push(`/verification/${data.registerUser.id}`);
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (err: any) {
  //     // eslint-disable-next-line no-alert
  //     alert(err);
  //   }
  // };
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
            <form onSubmit={handleSubmit(submitRequest)}>
              <List>
                <ListItem>
                  <Controller
                    name="fullname"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="filled"
                        fullWidth
                        id="fullname"
                        name="fullname"
                        label="Fullname"
                        inputProps={{ type: 'text', style: { textAlign: 'center' } }}
                        error={Boolean(errors.fullname)}
                        helperText={
                          <span style={{ color: '#FF0000' }}>{errors.fullname ? 'Fullname is required' : ''}</span>
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

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
                        label="e.g. Email xxxxx@gmail.com | xxxxx@mailinator.com"
                        inputProps={{ type: 'email', style: { textAlign: 'center' } }}
                        error={Boolean(errors.email)}
                        helperText={
                          <span style={{ color: '#FF0000' }}>
                            {errors.email
                              ? errors.email.type === 'pattern'
                                ? 'We must accepted gmail or mailinator account only to send a valid verification code e.g.(xxxxx@gmail.com|xxxxx@mailinator.com)'
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
