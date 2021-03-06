/* eslint-disable no-redeclare */
/* eslint-disable no-else-return */
/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';
// import { GetServerSideProps } from 'next';
// import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
// import { useForm, SubmitHandler } from 'react-hook-form';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import CheckoutWizard from '../../components/ui-component/CheckoutWizard';
import barangayAddress from '../../utils/jsonAddress/barangay.json';
import municipalAddress from '../../utils/jsonAddress/city.json';
import provinceAddress from '../../utils/jsonAddress/province.json';
import regionsAddress from '../../utils/jsonAddress/region.json';

// type ShippingForm = {
//   address: string;
//   city: string;
//   zipCode: number;
// };

// const url = 'https://rangerisrael.github.io/address-api/jsonAddress/region.json';

export default function ShippingAddress() {
  const router = useRouter();
  const { state } = useContext(Store);

  // eslint-disable-next-line no-redeclare

  // eslint-disable-next-line no-redeclare

  // const { handleSubmit } = useForm<ShippingForm>();
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
    // console.log(e.target.value);
    const splitted = e.target.value;
    //  const splices = splitted.split(/(.{2})/).filter((a: any) => a);

    const filterProvinces = provinceAddress.filter((prov: any) => prov.regCode === splitted).map((value: any) => value);
    setProvince(filterProvinces);
    setCities([]);
    setBrgy([]);
  };

  const citiesData = async (e: any) => {
    setProvinceValue(e.target.selectedOptions[0].text);
    setCitiesValue('');
    setBrgyValue('');
    setPurokValue('');
    // r.c.filter((cb: any) => cb.provCode === e.target.value).map((value: any) => setCities(value.citymunDesc));
    const filterCity = municipalAddress
      .filter((prov: any) => prov.provCode === e.target.value)
      .map((value: any) => value);
    setCities(filterCity);
    setBrgy([]);
  };

  const brgyData = async (e: any) => {
    setCitiesValue(e.target.selectedOptions[0].text);
    setBrgyValue('');
    setPurokValue('');
    // r.b.filter((bry: any) => bry.citymunCode === e.target.value).map((value: any) => setBrgy(value.brgyDesc));
    const filterBrgy = barangayAddress
      .filter((prov: any) => prov.citymunCode === e.target.value)
      .map((value: any) => value);
    setBrgy(filterBrgy);
  };

  const brgySelect = async (e: any) => {
    setBrgyValue(e.target.selectedOptions[0].text);
    setPurok(true);
  };

  // const shippingFormHandler: SubmitHandler<ShippingForm> = async (formData) => {
  //   console.log(formData);
  // };

  // const handlerMessage = async (statusText: string, status: number, message: string, type: MessageType) => {
  //   const response = `${statusText} ${status} : ${message}`;
  //   enqueueSnackbar(response, { variant: type });
  // };

  // if (error) {
  //   handlerMessage(statusText, status, data.message, 'error');
  // } else {
  //   handlerMessage(statusText, status, data.message, 'success');
  // }

  // console.log(regionsAddress);
  // console.log(provinceAddress);
  // console.log(municipalAddress);
  // console.log(barangayAddress);

  // const objects = barangayAddress.map((arr: any) =>
  //   arr.reduce((acc: any, cur: any) => {
  //     acc[cur.key] = cur.value;
  //     return acc;
  //   }, {})
  // );

  // console.log(objects);

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

                  {regionsAddress.map((data: any) => (
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
                    .map((data: any) => (
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
                    .map((data: any) => (
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
                    .map((data: any) => (
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
// export const getServerSideProps: GetServerSideProps<any> = async () => {
//   const regionAddress = await getRegion();
//   const provAddress = await getProvince();
//   const municipalAddress = await getCities();
//   const brgyAddress = await getBrgy();

//   const { error } = regionAddress || provAddress || municipalAddress || brgyAddress;
//   const { regions } = regionAddress;
//   const { provinces } = provAddress;
//   const { municipalities } = municipalAddress;
//   const { barangay } = brgyAddress;

//   if (error) {
//     console.log(error);
//   }

//   // when i added a props key
//   return {
//     props: {
//       regAddress: regions,
//       pAddress: provinces,
//       munAddress: municipalities,
//       brgyAddress: barangay,
//     },
//   };
// };
