/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { Button, Grid, ListItem, List, TextField } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Layout from '../../../components/Layout';
import BreakPoint from '../../../components/ui-component/Breakpoint';
import { getUserById, RequestNewPassword } from '../../../queries/users.queries';

type FormValues = {
  password: string;
  cpassword: string;
};

type Props = {
  users: {
    _id: string;
  };
};

type MessageType = 'default' | 'error' | 'success' | 'warning' | 'info';

export default function NewPassword({ users }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handlerMessage = async (statusText: string, status: number, message: string, type: MessageType) => {
    const response = `${statusText} ${status} : ${message}`;
    enqueueSnackbar(response, { variant: type });
  };

  const requestPassword: SubmitHandler<FormValues> = async (formData) => {
    closeSnackbar();

    if (formData.password !== formData.cpassword) {
      enqueueSnackbar('Make sure password and confirm password is matched', { variant: 'error' });
    } else {
      const password = await RequestNewPassword(users._id, formData.password);
      const { error, newpassword } = password;
      const { data, statusText, status } = newpassword.response ? newpassword.response : newpassword;
      if (error && !data.id) {
        handlerMessage(statusText, status, data.message, 'error');
      } else {
        handlerMessage(statusText, status, data.message, 'success');
        router.push(`/login`);
      }
    }
  };

  return (
    <Layout titles="request-password">
      <BreakPoint>
        <Grid container>
          <Grid item md={8} xs={12} style={{ margin: '4rem auto' }}>
            <fieldset>
              <legend style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}> Request Password</legend>
              <form onSubmit={handleSubmit(requestPassword)}>
                <List>
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
                        />
                      )}
                    />
                  </ListItem>

                  <ListItem>
                    <Controller
                      name="cpassword"
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
                          id="cpassword"
                          name="cpassword"
                          label="Confirm Password e.g. #PassWord@2021"
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
                        />
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained" type="submit">
                      Request password
                    </Button>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext<any>) => {
  // eslint-disable-next-line prefer-destructuring
  const request = context.params.id;

  const userCode = await getUserById(request);
  // const res = await fetch(`http://localhost:3000/api/products/${slug}`);
  // const product = await res.json();

  return {
    props: { users: userCode.userById },
  };
};
