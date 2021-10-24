import React, { useContext, useEffect } from 'react';
import {
  Card,
  Typography,
  Box,
  CardActionArea,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Store } from '../components/Store';
import { IProduct } from '../models/interface/Product';
import { ProductQueries, ProductQueriesById } from '../queries/product-queries';

type Props = {
  products: IProduct[];
};

export default function Index({ products }: Props) {
  const { state, dispatch } = useContext(Store);
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      Cookies.set('userInfo', JSON.stringify(session.user));
    }
    if (session === null) {
      router.push('/');
    }
    // eslint-disable-next-line react/destructuring-assignment
  }, [router, session]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCartHandler = async (product: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existItem = state.cart.cartItem.find((x: { _id: any }) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const productData = await ProductQueriesById(product._id);

    if (productData.product.countInStock < quantity) {
      // eslint-disable-next-line no-alert
      window.alert('Product is  out stocks');
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout titles="list-item">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia component="img" image={product.image} title={product.name} />
                    <CardContent
                      sx={{ display: 'flex', justifyContent: 'space-around', color: '#f3f4f6', background: '#506E7F' }}
                    >
                      <Typography variant="h6" component="h1">
                        &#8369;{product.price}
                      </Typography>
                      <Typography variant="h5" component="h1">
                        {product.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button fullWidth variant="contained" onClick={() => addToCartHandler(product)}>
                    Add to Basket
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const products = await ProductQueries();

  return {
    props: products,
  };
};
