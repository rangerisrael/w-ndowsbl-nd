// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';

export default function Index() {
  return (
    <Layout >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product
        </Typography>
      </Box>
    </Layout>
  );
}
