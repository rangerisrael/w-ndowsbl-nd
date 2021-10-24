/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';
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

    // eslint-disable-next-line react/destructuring-assignment
  }, [router, userInfo]);

  return (
    <Layout titles="shipping">
      <Typography component="h1" variant="h1">
        Shipping
      </Typography>
    </Layout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext<any>) => {
  return {
    props: { session: await getSession(context) },
  };
};
