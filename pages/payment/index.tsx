/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, Typography, Button, Box } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import CheckoutWizard from '../../components/ui-component/CheckoutWizard';
import { getProvince, getRegion, getCities, getBrgy } from '../../queries/addresses-queries';

type Regionss = {
  id: number;
  psgcCode?: string;
  regDesc?: string;
  regCode?: string;
};

type Provincess = {
  id: number;
  psgcCode?: string;
  regCode?: string;
  provCode?: string;
  provDesc?: string;
};
type Cities = {
  id: number;
  psgcCode: string;
  citymunDesc: string;
  regDesc: string;
  provCode: string;
  citymunCode: string;
};

type Barangays = {
  id: number;
  brgyCode: string;
  brgyDesc: string;
  regCode: string;
  provCode: string;
  citymunCode: string;
};

export default function PaymentTest() {
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
      <Box sx={{ marginTop: '2rem' }}>
        <CheckoutWizard steps={1} />
        <p>Test payment</p>
      </Box>
    </Layout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext<any>) => {
  const reg = await getRegion();
  const pig = await getProvince();
  const cite = await getCities();
  const bit = await getBrgy();

  return {
    props: {
      r: reg.regions,
      p: pig.provinces,
      c: cite.citises,
      b: bit.bryData,
      session: await getSession(context),
    },
  };
};
