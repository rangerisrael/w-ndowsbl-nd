import React from 'react';
import { Grid, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Layout from '../../components/Layout';

export default function ConfirmationEmail() {
  const verification = Cookies.get('verifyEmail');

  return (
    <Layout titles="email-verification">
      <Grid container>
        <Grid item md={8} xs={12} style={{ margin: '4rem auto' }}>
          <fieldset>
            <legend style={{ textAlign: 'center' }}> Email verification</legend>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} component="h2" variant="h2">
              Thank you for registering to our platform
            </Typography>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} component="h2" variant="h2">
              The confirmation link has been sent in {verification}{' '}
            </Typography>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} component="h1" variant="h1">
              Make sure the email address is correct{' '}
            </Typography>
          </fieldset>
        </Grid>
      </Grid>
    </Layout>
  );
}
