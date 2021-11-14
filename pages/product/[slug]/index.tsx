import React, { useContext } from 'react';
import { Grid, List, ListItem, Typography, Card, Button, Box, Rating, Link } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { Store } from '../../../components/Store';
import { IProduct } from '../../../models/interface/Product';
import { ProductQueriesById, ProductQueriesBySlug } from '../../../queries/product-queries';

export default function ProductDetails(product: IProduct) {
  const router = useRouter();

  const { _id, name, category, imageUrl, price, brand, rating, numReviews, countInStock, description } = product;

  // console.log(product);
  // const { slug } = router.query;
  // const product = data.products.find((a) => a.slug === slug);
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItem.find((x: { _id?: string }) => x._id === _id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const productData = await ProductQueriesById(_id);

    if (productData.product.countInStock < quantity) {
      // eslint-disable-next-line no-alert
      window.alert('Product is out of stocks');
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout titles={product ? name : ''}>
      <Box>
        {!product ? (
          'Product Not Found'
        ) : (
          <>
            <br />
            <Grid container>
              <Grid item md={6} xs={12}>
                <Image src={imageUrl} alt={name} width={500} height={500} layout="responsive" />
              </Grid>

              <Grid item md={4} xs={12}>
                <List>
                  <ListItem>
                    <Typography component="h1" variant="h4">
                      {name}
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Typography>
                      Category:<strong>{category}</strong>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Brand:<strong>{brand}</strong>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <Rating value={rating} readOnly />
                    </Typography>
                    <Link href="#reviews">
                      <Typography>({numReviews} reviews)</Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Description:<strong>{description}</strong>
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
                          <Typography sx={{ fontWeight: 'bold', fontSize: '0.99rem' }}> &#8369;{price}</Typography>
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
                            {countInStock > 0 ? 'in stock' : 'out of stock'} ({countInStock > 0 ? countInStock : ''})
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext<any>) => {
  const slugName = context.params.slug;

  const product = await ProductQueriesBySlug(slugName);
  // const res = await fetch(`http://localhost:3000/api/products/${slug}`);
  // const product = await res.json();

  return {
    props: { product: product.product },
  };
};
