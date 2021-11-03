/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/self-closing-comp */

import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, Typography, Button, Box, MenuItem, Select } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
// import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import CheckoutWizard from '../../components/ui-component/CheckoutWizard';
import provincesAddress from '../../utils/jsonAddress/province.json';
import regionAddress from '../../utils/jsonAddress/region.json';

// type ShippingForm = {
//   address: string;
//   city: string;
//   zipCode: number;
// };

type Address = {
  id: number;
  psgcCode?: string;
  regDesc?: string;
  regCode?: string;
  provCode?: string;
  provDesc?: string;
};

export default function ShippingAddress() {
  const router = useRouter();
  const { state } = useContext(Store);
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm<ShippingForm>();
  const { userInfo } = state;
  // const [optionAddressValue, setOptionAddressValue] = useState('Choose Address');
  // const [optionCityValue, setOptionCityValue] = useState('Choose City');
  // // eslint-disable-next-line no-unused-vars
  // const [optionBrgy, setOptionBrgyValue] = useState('Chooose Barangay');
  // const [typeList, setType] = useState('Choose Type');
  const [value, setValue] = useState();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, [router, userInfo]);

  // const shippingFormHandler: SubmitHandler<ShippingForm> = async (formData) => {
  //   console.log(formData);
  // };

  const dropdownRegion = (e: any) => {
    setValue(e.target.value);
  };

  const provinces = regionAddress.map((prov) => provincesAddress.map((a) => a.regCode === prov.regCode && a.provDesc));

  
  return (
    <Layout titles="shipping">
      <Box sx={{ marginTop: '2rem' }}>
        <CheckoutWizard steps={1} />
        <br />
        <fieldset>
          <legend style={{ textAlign: 'center' }}>
            <Typography component="h1" variant="h1">
              Shipping Address
            </Typography>
          </legend>
          <form>
            <List>
              <ListItem>
                <Select fullWidth name="address" onChange={dropdownRegion}>
                  {regionAddress.map((data: Address) => (
                    <MenuItem key={data.id} value={data.regCode}>
                      {data.regDesc}
                    </MenuItem>
                  ))}
                </Select>
              </ListItem>
              {Object.keys(provinces).map((outerLoop: any) =>
                Object.keys(
                  provinces[outerLoop].map((innerLoop: any) =>
                    value === innerLoop ? (
                      <ListItem>
                        <div key={`${outerLoop}-${innerLoop}`}>
                          test{outerLoop}value
                          {innerLoop}
                        </div>
                      </ListItem>
                    ) : (
                      ''
                    )
                  )
                )
              )}

              {/* {value === '03' ? (
                <ListItem>
                  <Select fullWidth name="address" onChange={dropdownRegion}>
                    {provinces.map((data: Address) => (
                      <MenuItem key={data.id} value={data.provCode}>
                        {data.provDesc}
                      </MenuItem>
                    ))}
                  </Select>
                </ListItem>
              ) : (
                ''
              )} */}

              <ListItem>
                <Button fullWidth variant="contained" type="submit">
                  Proceed
                </Button>
              </ListItem>
            </List>
          </form>
        </fieldset>
      </Box>
    </Layout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext<any>) => {
  return {
    props: { session: await getSession(context) },
  };
};
