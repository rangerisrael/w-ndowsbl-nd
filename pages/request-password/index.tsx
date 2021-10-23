/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-lonely-if */
/* eslint-disable import/order */

import { Button, Grid, ListItem, TextField, List } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getUserByEmail } from '../../queries/users.queries';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  email: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RequestPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const requestPassword: SubmitHandler<FormValues> = async (data) => {
    closeSnackbar();
    const user = await getUserByEmail(data.email);

    if (!user.getEmail.id) {
      enqueueSnackbar(user.getEmail.message, { variant: 'error' });
    } else {
      enqueueSnackbar(user.getEmail.message, { variant: 'success' });
      router.push(`/new-password/${user.getEmail.id}`);
    }
  };

  return (
    <Layout titles="request-password">
      <Grid container>
        <Grid item md={8} xs={12} style={{ margin: '4rem auto' }}>
          <fieldset>
            <legend style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}> Request Password</legend>
            <form onSubmit={handleSubmit(requestPassword)}>
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
                                ? 'We must accepted gmail or mailinator account only  e.g.(xxxxx@gmail.com|xxxxx@mailinator.com)'
                                : 'Email is required'
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
    </Layout>
  );
}
