/* eslint-disable no-return-await */ import axios from 'axios';
import { IUser } from '../models/interface/Users';

// eslint-disable-next-line import/prefer-default-export
export const getUserByCode = async (_id: IUser['_id']) =>
  await axios
    .get(`${`${process.env.LOCAL_URL}api/activate/${_id}`}`)
    .then((res) => ({
      error: false,
      usercode: res.data,
    }))
    .catch(() => ({
      error: true,
      usercode: null,
    }));

// eslint-disable-next-line import/prefer-default-export
export const VerifyingUser = async (_id: IUser['_id'], codes: number, verify: boolean) =>
  await axios
    .put(`${`${process.env.LOCAL_URL}api/activate/${_id}`}`, { codes, verify })
    .then((res) => ({
      error: false,
      verifyUser: res.data,
    }))
    .catch(() => ({
      error: true,
      verifyUser: null,
    }));
