import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function ShippingAddress() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <Layout titles="shipping">
      <Typography component="h1" variant="h1">
        Shipping{' '}
      </Typography>
    </Layout>
  );
}
