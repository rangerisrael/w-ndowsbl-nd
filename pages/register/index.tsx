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
import { Controller, useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import { RegisterUser } from '../../queries/users.queries';

export default function RegisterUsers() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const submitRequest = async (fullname: any, email: any, password: any) => {
    try {
      const data = await RegisterUser(fullname, email, password);

      console.log(data);
      if (data.registerUser.id === '') {
        // eslint-disable-next-line no-alert
        alert(data.registerUser.message);
      } else {
        // eslint-disable-next-line no-alert
        alert(data.registerUser.message);
        router.push(`/verification/${data.registerUser.id}`);
      }
    } catch (err: any) {
      alert(err.response.data.registerUser ? err.response.data.registerUser.message : err.registerUser.message);
    }
  };

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
            <form
              onSubmit={handleSubmit(() => {
                submitRequest;
              })}
            >
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
                        error={Boolean(errors.name)}
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
                      pattern: /^([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)\@(?:gmail)([\.])(?:com)$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="filled"
                        fullWidth
                        id="email"
                        name="email"
                        label="Email xxxxx@gmail.com"
                        inputProps={{ type: 'email', style: { textAlign: 'center' } }}
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
