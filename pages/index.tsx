import React, { useContext } from 'react';
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
import NextLink from 'next/link';
import Layout from '../components/Layout';
import { Store } from '../components/Store';
import { IProduct } from '../models/interface/Product';
import { ProductQueries } from '../queries/product-queries';

type Props = {
  products: IProduct[];
};

export default function Index({ products }: Props) {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    // const data = products.map((item) => item._id);
    // console.log(data);
    // const productData = await fetch(`http://localhost:3000/api/product/${data._id}`);
    // const listData = await productData.json();
    // if (listData.countInStock <= 0) {
    //   window.alert('Product is not available');
    //   return;
    // }
    // dispatch({ type: 'ADD_TO_CART', payload: { ...products, quantity: 1 } });
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
                  <Button fullWidth variant="contained" onClick={addToCartHandler}>
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
