/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-await */ import axios from 'axios';
import { IUser } from '../models/interface/Users';

// eslint-disable-next-line import/prefer-default-export
export const getUserById = async (_id: IUser['_id']) =>
  await axios
    .get(`${`${process.env.LOCAL_URL}api/activate/${_id}`}`)
    .then((res) => ({
      error: false,
      userById: res.data,
    }))
    .catch(() => ({
      error: true,
      userById: null,
    }));

export const getUserByEmail = async (id: IUser['email']) =>
  await axios
    .get(`${`${process.env.LOCAL_URL}api/reset-password/${id}`}`)
    .then((res) => ({
      error: false,
      getEmail: res.data,
    }))
    .catch(() => ({
      error: true,
      getEmail: null,
    }));

// eslint-disable-next-line import/prefer-default-export
export const LoginUser = async (email: string, password: string) =>
  await axios
    .post(`${`${process.env.LOCAL_URL}api/users/signIn`}`, { email, password })
    .then((res) => ({
      error: false,
      loginUser: res.data,
    }))
    .catch((err: any) => ({
      error: true,
      loginUser: err,
    }));

// eslint-disable-next-line import/prefer-default-export
export const RegisterUser = async (name: string, email: string, password: string) =>
  await axios
    .post(`${`${process.env.LOCAL_URL}api/users/signUp`}`, { name, email, password })
    .then((res) => ({
      error: false,
      registerUser: res.data,
    }))
    .catch(() => ({
      error: true,
      registerUser: null,
    }));

// eslint-disable-next-line import/prefer-default-export
export const VerifyingUser = async (_id: string, codes: number, verify: boolean) =>
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

export const RequestNewCode = async (_id: string, randomCode: number) =>
  await axios
    .put(`${`${process.env.LOCAL_URL}api/request/${_id}`}`, { randomCode })
    .then((res) => ({
      error: false,
      requestCode: res.data,
    }))
    .catch(() => ({
      error: true,
      requestCode: null,
    }));

export const VerifyingUserByLink = async (_id: string, verify: boolean) =>
  await axios
    .put(`${`${process.env.LOCAL_URL}api/request/${_id}`}`, { verify })
    .then((res) => ({
      error: false,
      verifyUserByLink: res.data,
    }))
    .catch(() => ({
      error: true,
      verifyUserByLink: null,
    }));

export const RequestNewPassword = async (id: string, password: string) =>
  await axios
    .put(`${`${process.env.LOCAL_URL}api/reset-password/${id}`}`, { password })
    .then((res) => ({
      error: false,
      requestPassword: res.data,
    }))
    .catch(() => ({
      error: true,
      requestPassword: null,
    }));
