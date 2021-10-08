import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';

export default function ShippingAddress() {
  const router = useRouter();
  const { state } = useContext(Store);
  const [session] = useSession();

  const { userInfo } = state;

  console.log(session);

  useEffect(() => {
    if (!userInfo || !session) {
      router.push('/login?redirect=/shipping');
    } 
  }, [router, session, userInfo]);

  return (
    <Layout titles="shipping">
      <Typography component="h1" variant="h1">
        Shipping{' '}
      </Typography>
    </Layout>
  );
}
