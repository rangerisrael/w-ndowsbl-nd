/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactChildren, ReactChild } from 'react';
import { AppBar, Container, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactChild | ReactChildren;
}

const LayoutStyle = styled.div`
  .appBar {
    background: #4c4c4a;

    a {
      color: #f3f4f6;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .container {
    min-height: 80vh;
  }
  .footer {
    text-align: center;
  }
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutStyle>
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
        <Typography>
          All right reserved &copy; 2021 <strong>w!ndowsbl!nd@shop</strong>{' '}
        </Typography>
      </footer>
    </LayoutStyle>
  );
}
