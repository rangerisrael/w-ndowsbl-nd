import React from 'react';
import { AppBar, Container, Paper, Toolbar, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <Paper>
      <AppBar
        sx={{
          background: 'rgb(76,76,74)',
        }}
        position="static"
      >
        <Toolbar>
          <Typography>W!ndowsBl!nd</Typography>
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
          All right reserved &copy; 2021 <strong>w!ndowbl!nd@shop</strong>{' '}
        </Typography>
      </footer>
    </Paper>
  );
}
