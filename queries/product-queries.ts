/* eslint-disable no-return-await */
import axios from 'axios';

export const ProductQueries = async () =>
  await axios
    .get(`${`${process.env.LOCAL_URL  }api/product`}`)
    .then((res) => ({
      error: false,
      products: res.data,
    }))
    .catch(() => ({
      error: true,
      products: null,
    }));

export const ProductQueriesBySlug = async (slug: string) =>
  await axios
    .get(`${`${process.env.LOCAL_URL  }api/products/${  slug}`}`)
    .then((res) => ({
      error: false,
      product: res.data,
    }))
    .catch(() => ({
      error: true,
      product: null,
    }));

export const ProductQueriesById = async (id: string) =>
  await axios
    .get(`${`${process.env.LOCAL_URL  }api/product/${  id}`}`)
    .then((res) => ({
      error: false,
      product: res.data,
    }))
    .catch(() => ({
      error: true,
      product: null,
    }));
