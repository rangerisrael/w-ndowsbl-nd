/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable eqeqeq */
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

export default function ShippingAddress(r: { r: Regionss[]; p: Provincess[]; c: Cities[]; b: Barangays[] }) {
  const router = useRouter();
  const { state } = useContext(Store);

  const { userInfo } = state;

  const [province, setProvince] = useState([]);
  const [cities, setCities] = useState([]);
  const [brgy, setBrgy] = useState([]);

  const [regionValue, setRegionValue] = useState('');
  const [provinceValue, setProvinceValue] = useState('');
  const [citiesValue, setCitiesValue] = useState('');
  const [brgyValue, setBrgyValue] = useState('');

  const [purok, setPurok] = useState(false);
  const [purokValue, setPurokValue] = useState('');

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, [router, userInfo]);

  const provinceData = async (e: any) => {
    if (e.target.value === '') {
      e.target.value = 'Choose Region';
      console.log(e);
      setRegionValue('');
      setProvinceValue('');
      setCitiesValue('');
      setBrgyValue('');
      setPurokValue('');
    } else {
      // event.target.options[event.target.selectedIndex].text
      setRegionValue(e.target.selectedOptions[0].text);
      // setRegionValue(e.target.value.substring(2));
      setProvinceValue('');
      setCitiesValue('');
      setBrgyValue('');
      setPurokValue('');
    }
    console.log(e.target.value);
    const splitted = e.target.value;
    const filterProvinces = r.p.filter((prov: any) => prov.regCode == splitted).map((value: any) => value);
    setProvince(filterProvinces);
    setCities([]);
    setBrgy([]);
  };

  const citiesData = async (e: any) => {
    setProvinceValue(e.target.selectedOptions[0].text);
    setCitiesValue('');
    setBrgyValue('');
    setPurokValue('');
    const filterCity = r.c.filter((prov: any) => prov.provCode == e.target.value).map((value: any) => value);
    setCities(filterCity);
    setBrgy([]);
  };

  const brgyData = async (e: any) => {
    setCitiesValue(e.target.selectedOptions[0].text);
    setBrgyValue('');
    setPurokValue('');
    const filterBrgy = r.b.filter((prov: any) => prov.citymunCode == e.target.value).map((value: any) => value);
    setBrgy(filterBrgy);
  };

  const brgySelect = async (e: any) => {
    setBrgyValue(e.target.selectedOptions[0].text);
    setPurok(true);
  };

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
                <select
                  style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  name="address"
                  onChange={provinceData}
                >
                  <option disabled key=" value=">
                    Choose Region
                  </option>
                  <option key=" value=" />

                  {r.r.map((data: Regionss) => (
                    <option key={data.id} value={data.regCode}>
                      {data.regDesc}
                    </option>
                  ))}
                </select>
              </ListItem>
              <ListItem>
                <select
                  style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  name="address"
                  onChange={citiesData}
                >
                  <option disabled key=" value=">
                    Choose City/Provinces
                  </option>
                  <option key=" value=" />

                  {province
                    .sort((a: any, b: any) => (a.provDesc > b.provDesc ? 1 : -1))
                    .map((data: Provincess) => (
                      <option key={data.id} value={data.provCode}>
                        {data.provDesc}
                      </option>
                    ))}
                </select>
              </ListItem>
              <ListItem>
                <select
                  style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  name="address"
                  onChange={brgyData}
                >
                  <option disabled key=" value=">
                    Choose Municipalities
                  </option>
                  <option style={{ borderBottom: '1px solid black' }} key=" value=" />

                  {cities
                    .sort((a: any, b: any) => (a.citymunDesc > b.citymunDesc ? 1 : -1))
                    .map((data: Cities) => (
                      <option key={data.id} value={data.citymunCode}>
                        {data.citymunDesc}
                      </option>
                    ))}
                </select>
              </ListItem>
              <ListItem>
                <select
                  style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  name="address"
                  onChange={brgySelect}
                >
                  <option disabled key=" value=">
                    Choose Barangay
                  </option>
                  <option key=" value=" />
                  {brgy
                    .sort((a: any, b: any) => (a.brgyDesc > b.brgyDesc ? 1 : -1))
                    .map((data: Barangays) => (
                      <option key={data.id} value={data.citymunCode}>
                        {data.brgyDesc}
                      </option>
                    ))}
                </select>
              </ListItem>
              <ListItem>
                {purok && regionValue && citiesValue && provinceValue && brgyValue && (
                  <input
                    type="text"
                    placeholder="Specify other information if Applicable"
                    name="purok"
                    onChange={(e: any) => setPurokValue(e.target.value)}
                    style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  />
                )}
              </ListItem>

              <div style={{ textAlign: 'center' }}>
                {purokValue}&nbsp; {brgyValue}&nbsp;
                {citiesValue}&nbsp; {provinceValue}&nbsp;
                {regionValue}
              </div>
              <ListItem>
                <Button
                  style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  variant="contained"
                  type="submit"
                >
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
