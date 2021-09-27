/* eslint-disable import/order */

import React, { useContext } from 'react';
import Layout from '../../../components/Layout';
import data from '../../../utils/data';
import Image from 'next/image';
import { Grid, List, ListItem, Typography, Card, Button, Box, Rating, Link } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Store } from '../../../components/Store';
import { ProductQueriesById, ProductQueriesBySlug } from '../../../queries/product-queries';

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  product: IProduct;
};

export default function ProductDetails({ product }: Props) {
  // const router = useRouter();

  // console.log(product);
  // const { slug } = router.query;
  // const product = data.products.find((a) => a.slug === slug);
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    // const productData = await fetch(`http://localhost:3000/api/product/${product._id}`);
    const productData = await ProductQueriesById(product._id);

    if (productData.product.countInStock <= 0) {
      window.alert('Product is not available');
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
  };

  return (
    <Layout titles={product ? product.name : ''}>
      <Box>
        {!product ? (
          'Product Not Found'
        ) : (
          <>
            <br />
            <Grid container>
              <Grid item md={6} xs={12}>
                <Image src={product.image} alt={product.name} width={500} height={500} layout="responsive" />
              </Grid>

              <Grid item md={4} xs={12}>
                <List>
                  <ListItem>
                    <Typography component="h1" variant="h4">
                      {product.name}
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Typography>
                      Category:<strong>{product.category}</strong>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Brand:<strong>{product.brand}</strong>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <Rating value={product.rating} readOnly />
                    </Typography>
                    <Link href="#reviews">
                      <Typography>({product.numReviews} reviews)</Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Description:<strong>{product.description}</strong>
                    </Typography>
                  </ListItem>
                </List>
              </Grid>

              <Grid item md={2} xs={12}>
                <Card>
                  <List>
                    <ListItem>
                      <Grid container spacing={5}>
                        <Grid item>
                          <Typography> Price </Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ fontWeight: 'bold', fontSize: '0.99rem' }}>
                            {' '}
                            &#8369;{product.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Typography> Status: </Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ fontWeight: 'bold', fontSize: '0.99rem' }}>
                            {product.countInStock > 0 ? 'in stock' : 'out of stock'} (
                            {product.countInStock > 0 ? product.countInStock : ''})
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Button fullWidth variant="contained" onClick={addToCartHandler}>
                        Add to Basket
                      </Button>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
        <br />
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext<any>) => {
  const slugName = context.params.slug;

  const product = await ProductQueriesBySlug(slugName);
  // const res = await fetch(`http://localhost:3000/api/products/${slug}`);
  // const product = await res.json();

  return {
    props: { product: product.product },
  };
};
