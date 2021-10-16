/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactChildren, ReactElement, useContext, useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Container, Link, Toolbar, Typography, Badge } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import NextLink from 'next/link';
import { Store } from './Store';
import { DayNightMode } from './SwitchMode';
import LayoutStyle from './ui-component/LayoutStyle';
import UserIdentity from './ui-component/MenuItem';
import CircularProgressWithLabel from './ui-component/ProgressBar';

interface LayoutProps {
  titles: string;
  children: ReactChildren | ReactElement;
}

// eslint-disable-next-line no-undef
export default function Layout({ titles, children }: LayoutProps) {
  const [session] = useSession();
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(10);
  const { darkMode, cart, userInfo } = state;

  // Create a theme instance.
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#353535',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: '#c3c3c3',
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON', payload: undefined });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <LayoutStyle>
      <Head>
        <title>{titles ? `WindowsBlind / ${titles}` : 'WindowsBlind'} </title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!loading ? (
          <CircularProgressWithLabel value={progress} />
        ) : (
          <>
            <AppBar className="appBar" position="static">
              <Toolbar>
                <NextLink href="/">
                  <Link sx={{ color: '#f3f4f6' }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>W!ndowsBl!nd</Typography>
                  </Link>
                </NextLink>
                <div style={{ flexGrow: 1 }} />
                <DayNightMode defaultChecked={darkMode} onChange={darkModeChangeHandler} />
                &nbsp;
                <div>
                  <NextLink href="/cart" passHref>
                    <Link>
                      {' '}
                      {cart.cartItem.length > 0 ? (
                        <Badge badgeContent={cart.cartItem.length}>
                          <ShoppingCartIcon />{' '}
                        </Badge>
                      ) : (
                        <ShoppingCartIcon />
                      )}
                    </Link>
                  </NextLink>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {session?.user ? (
                    <UserIdentity name={session.user.name} />
                  ) : userInfo ? (
                    <UserIdentity name={userInfo.name.split(' ').slice(0, -1).join('')} />
                  ) : (
                    <NextLink href="/login" passHref>
                      <Link>Login</Link>
                    </NextLink>
                  )}
                </div>
              </Toolbar>
            </AppBar>
            <Container className="container">{children}</Container>
            <footer className="footer">
              <Typography component="h2" variant="h6" sx={{ color: '#f3f4f6' }}>
                All right reserved &copy; 2021 <strong>w!ndowsbl!nd@shop</strong>{' '}
              </Typography>
            </footer>
          </>
        )}
      </ThemeProvider>
    </LayoutStyle>
  );
}
