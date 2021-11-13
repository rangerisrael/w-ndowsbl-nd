/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-await */
import axios from 'axios';

export const getRegion = async () =>
  await axios
    .get(process.env.REGION_ADDRESS)
    .then((response) => ({
      error: false,
      regions: response.data,
    }))
    .catch((err: any) => ({
      error: true,
      regions: err,
    }));

export const getProvince = async () =>
  await axios
    .get(process.env.PROVINCE_ADDRESS)
    .then((response) => ({
      error: false,
      provinces: response.data,
    }))
    .catch((err: any) => ({
      error: true,
      provinces: err,
    }));

export const getCities = async () =>
  await axios
    .get(process.env.CITIES_ADDRESS)
    .then((response) => ({
      error: false,
      municipalities: response.data,
    }))
    .catch((err: any) => ({
      error: true,
      municipalities: err,
    }));

export const getBrgy = async () =>
  await axios
    .get(process.env.BRGY_ADDRESS)
    .then((response) => ({
      error: false,
      barangay: response.data,
    }))
    .catch((err: any) => ({
      error: true,
      barangay: err,
    }));
