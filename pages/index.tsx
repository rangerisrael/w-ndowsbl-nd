// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { Card, CardActionArea, Grid, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import data from '../utils/data';

export default function Index() {
  return (
    <Layout titles="list-item">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product
        </Typography>
        <Grid container spacing={3}>
          {data.products.map((product) => (
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
                  <Button fullWidth variant="contained">
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
