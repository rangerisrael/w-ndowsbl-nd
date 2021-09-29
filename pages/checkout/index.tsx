/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';

export default function Checkout() {
  const { state } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;

  return (
    <Layout titles="checkout">
      <div>
        <Typography component="h1" variant="h1">
          Shopping Cart
        </Typography>
        {cartItem.length === 0 ? (
          <div>
            Cart is empty list <NextLink href="/">Go to product to buy item</NextLink>
          </div>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell> Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItem.map((item: any) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <NextLink href={`product/${item.slug}`} passHref>
                            <Link>
                              <Image src={item.image} width={50} height={50} layout="responsive" />
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell>
                          <NextLink href={`product/${item.slug}`} passHref>
                            <Link>
                              <Typography component="h2" variant="h2">
                                {item.name}
                              </Typography>
                            </Link>
                          </NextLink>
                        </TableCell>

                        <TableCell align="right">
                          <Select value={item.quantity}>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="right">
                          <Typography component="h2" variant="h2">
                            &#8369;{item.price}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button variant="contained" color="primary">
                            X
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h2">
                      Total Price ({cartItem.reduce((a: any, c: any) => a + c.quantity, 0)}&nbsp; items) : &#8369;
                      {cartItem.reduce((a: any, c: any) => a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained" color="primary">
                      Checkout
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </Layout>
  );
}
