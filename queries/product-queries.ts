/* eslint-disable no-return-await */
import axios from 'axios';
import { IProduct } from '../models/interface/Product';

export const ProductQueries = async () =>
  await axios
    .get(`${`${process.env.LOCAL_URL}api/product`}`)
    .then((res) => ({
      error: false,
      product: res.data,
    }))
    .catch(() => ({
      error: true,
      product: null,
    }));

export const ProductQueriesBySlug = async (slug: IProduct['slug']) =>
  await axios
    .get(`${`${process.env.LOCAL_URL}api/products/${slug}`}`)
    .then((res) => ({
      error: false,
      product: res.data,
    }))
    .catch(() => ({
      error: true,
      product: null,
    }));

export const ProductQueriesById = async (id: IProduct['_id']) =>
  await axios
    .get(`${`${process.env.LOCAL_URL}api/product/${id}`}`)
    .then((res) => ({
      error: false,
      product: res.data,
    }))
    .catch(() => ({
      error: true,
      product: null,
    }));
