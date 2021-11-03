/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Typography, CircularProgress } from '@mui/material';

type Props = {
  value: number;
};

export default function CircularProgressWithLabel({ value }: Props) {
  return (
    <div style={{ position: 'relative', background: 'transparent' }}>
      <CircularProgress
        sx={{
          margin: 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        thickness={1.5}
        size={100}
        value={value}
      />
      <Typography
        sx={{
          height: '100vh',
          display: 'flex', // make us of Flexbox
          alignItems: 'center', // does vertically center the desired content
          justifyContent: 'center', // horizontally centers single line items
          textAlign: 'center', // optional, but helps horizontally center text that breaks into multiple lines
        }}
      >
        {`${Math.round(value)}%`}
      </Typography>
    </div>
  );
}
