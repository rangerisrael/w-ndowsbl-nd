// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { Card, CardActionArea, Grid, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';
import data from '../utils/data';

export default function Index() {
  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product
        </Typography>
        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} title={product.name} />
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Typography variant="h6" component="h1">
                      &#8369;{product.price}
                    </Typography>
                    <Typography variant="h5" component="h1">
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button size="small" color="primary">
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
