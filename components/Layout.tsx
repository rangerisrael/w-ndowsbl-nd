/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactChildren, ReactElement, useContext } from 'react';
import { AppBar, Container, Link, Toolbar, Typography, Switch } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import Head from 'next/head';
import NextLink from 'next/link';
import styled from 'styled-components';
import { Store } from './Store';

interface LayoutProps {
  titles: string;
  children: ReactChildren | ReactElement;
}

const LayoutStyle = styled.div`
  .appBar {
    background: #4c4c4a;

    a {
      color: #f3f4f6;
      text-decoration: none;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .container {
    min-height: 80vh;
  }
  .footer {
    padding: 1rem 0;
    background: rgb(76, 76, 72);
    text-align: center;
  }
`;

// eslint-disable-next-line no-undef
export default function Layout({ titles, children }: LayoutProps) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

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
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  return (
    <LayoutStyle>
      <Head>
        <title>{titles ? `WindowsBlind / ${titles}` : 'WindowsBlind'} </title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar className="appBar" position="static">
          <Toolbar>
            <NextLink href="/">
              <Link sx={{ color: '#f3f4f6' }}>
                <a>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>W!ndowsBl!nd</Typography>
                </a>
              </Link>
            </NextLink>

            <div style={{ flexGrow: 1 }} />
            <div>
              <Switch checked={darkMode} onChange={darkModeChangeHandler} />
              &nbsp;
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className="container">{children}</Container>
        <footer className="footer">
          <Typography component="h2" variant="h6" sx={{ color: '#f3f4f6' }}>
            All right reserved &copy; 2021 <strong>w!ndowsbl!nd@shop</strong>{' '}
          </Typography>
        </footer>
      </ThemeProvider>
    </LayoutStyle>
  );
}
