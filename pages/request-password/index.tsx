/* eslint-disable react/self-closing-comp */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-lonely-if */
/* eslint-disable import/order */

import { Button, Grid, ListItem, TextField, List } from '@mui/material';
import BreakPoint from '../../components/ui-component/Breakpoint';
import { useSnackbar } from 'notistack';
import Layout from '../../components/Layout';
import { getUserByEmail } from '../../queries/users.queries';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  email: string;
};

type MessageType = 'default' | 'error' | 'success' | 'warning' | 'info';

export default function RequestPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handlerMessage = async (statusText: string, status: number, message: string, type: MessageType) => {
    const response = `${statusText} ${status} : ${message}`;
    enqueueSnackbar(response, { variant: type });
  };

  const requestPassword: SubmitHandler<FormValues> = async (formData) => {
    closeSnackbar();
    const getUser = await getUserByEmail(formData.email);
    const { error, getEmail } = getUser;
    const { data, statusText, status } = getEmail.response ? getEmail.response : getEmail;

    if (error && !data.id) {
      handlerMessage(statusText, status, data.message, 'error');
    } else {
      handlerMessage(statusText, status, data.message, 'success');
    }
  };

  return (
    <Layout titles="request-password">
      <BreakPoint>
        <Grid container>
          <Grid className="md-center" item md={8} xs={12}>
            <fieldset>
              <legend
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                {' '}
                Request Password
              </legend>
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
                          inputProps={{
                            type: 'email',
                            style: { textAlign: 'center' },
                          }}
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
                    ></Controller>
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
