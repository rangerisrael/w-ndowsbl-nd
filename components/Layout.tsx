import React, { ReactChildren, ReactChild } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

interface LayoutProps {
  children: ReactChild | ReactChildren;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppBar
        sx={{
          background: 'rgb(76,76,74)',
        }}
        position="static"
      >
        <Toolbar>
          <Typography variant="h5">W!ndowsBl!nd</Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          minHeight: '80vh',
        }}
      >
        {children}
      </Container>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography>
          All right reserved &copy; 2021 <strong>w!ndowsbl!nd@shop</strong>{' '}
        </Typography>
      </footer>
    </>
  );
}
