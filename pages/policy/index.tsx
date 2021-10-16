import { Grid } from '@mui/material';
import Layout from '../../components/Layout';

export default function Policy() {
  return (
    <Layout titles="policies">
      <Grid container>
        <Grid item md={8} xs={12} style={{ margin: '2rem auto' }}>
          <h2>Privacy Policy</h2>
          <p>This site uses Nextjs Material UI and Mongodb and styled components .</p>
          <p>
            Data provided to this site is exclusively used to support signing in and is not passed to any third party
            services, other than via SMTP or OAuth for the purposes of authentication.
          </p>
        </Grid>
      </Grid>
    </Layout>
  );
}
