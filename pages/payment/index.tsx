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

export default function PaymentTest(address: { r: Regionss[]; p: Provincess[]; c: Cities[]; b: Barangays[] }) {
  const router = useRouter();
  const { state } = useContext(Store);
  // eslint-disable-next-line no-redeclare
  const { r, p, c, b } = address;

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
      setRegionValue(e.target.selectedOptions[0].text);
      setProvinceValue('');
      setCitiesValue('');
      setBrgyValue('');
      setPurokValue('');
    }

    const splitted = e.target.value;
    const filterProvinces = p.filter((prov: any) => prov.regCode === splitted).map((value: any) => value);
    setProvince(filterProvinces);
    setCities([]);
    setBrgy([]);
  };

  const citiesData = async (e: any) => {
    setProvinceValue(e.target.selectedOptions[0].text);
    setCitiesValue('');
    setBrgyValue('');
    setPurokValue('');
    const filterCity = c.filter((prov: any) => prov.provCode === e.target.value).map((value: any) => value);
    setCities(filterCity);
    setBrgy([]);
  };

  const brgyData = async (e: any) => {
    setCitiesValue(e.target.selectedOptions[0].text);
    setBrgyValue('');
    setPurokValue('');
    const filterBrgy = b.filter((prov: any) => prov.citymunCode === e.target.value).map((value: any) => value);
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
                  name="region"
                  onChange={provinceData}
                >
                  <option disabled key="01" value="">
                    Choose Region
                  </option>
                  <option key="0" value="0"></option>

                  {r.map((data: Regionss) => (
                    <option key={data.regCode} value={data.regCode}>
                      {data.regDesc}
                    </option>
                  ))}
                </select>
              </ListItem>
              <ListItem>
                <select
                  style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  name="city"
                  onChange={citiesData}
                >
                  <option key="06" disabled value="">
                    Choose City/Provinces
                  </option>
                  <option key="1" value=""></option>

                  {province
                    .sort((a: any, b: any) => (a.provDesc > b.provDesc ? 1 : -1))
                    .map((data: Provincess) => (
                      <option key={data.provCode} value={data.provCode}>
                        {data.provDesc}
                      </option>
                    ))}
                </select>
              </ListItem>
              <ListItem>
                <select
                  style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  name="municipal"
                  onChange={brgyData}
                >
                  <option key="08" disabled value="">
                    Choose Municipalities
                  </option>
                  <option style={{ borderBottom: '1px solid black' }} key="2" value=""></option>

                  {cities
                    .sort((a: any, b: any) => (a.citymunDesc > b.citymunDesc ? 1 : -1))
                    .map((data: Cities) => (
                      <option key={data.citymunCode} value={data.citymunCode}>
                        {data.citymunDesc}
                      </option>
                    ))}
                </select>
              </ListItem>
              <ListItem>
                <select
                  style={{ width: '100%', margin: '0 auto', padding: '0.5rem 0', textAlign: 'center' }}
                  name="brgy"
                  onChange={brgySelect}
                >
                  <option disabled key="04" value="">
                    Choose Barangay
                  </option>
                  <option key="3" value=""></option>
                  {brgy
                    .sort((a: any, b: any) => (a.brgyDesc > b.brgyDesc ? 1 : -1))
                    .map((data: Barangays) => (
                      <option key={data.brgyCode} value={data.brgyCode}>
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
                {/* {JSON.stringify(getValues(), null, 4)} */}
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
