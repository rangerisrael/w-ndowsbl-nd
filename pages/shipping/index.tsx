import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';

export default function ShippingAddress() {
  const router = useRouter();
  const { state } = useContext(Store);

  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, [router, userInfo]);

  return (
    <Layout titles="shipping">
      <Typography component="h1" variant="h1">
        Shipping{' '}
      </Typography>
    </Layout>
  );
}
