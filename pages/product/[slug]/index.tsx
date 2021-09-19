/* eslint-disable import/order */
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layout';
import data from '../../../utils/data';
import Image from 'next/image';
import { Grid, List, ListItem, Typography, Card, Button, Box } from '@mui/material';

export default function ProductDetails() {
  const router = useRouter();

  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);

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
                      Category:<strong>{product.category.toUpperCase()}</strong>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Brand:<strong>{product.brand.toLocaleLowerCase()}</strong>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Rating: {product.rating} stars ({product.numReviews} reviews)
                    </Typography>
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
                      <Button fullWidth variant="contained">
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
