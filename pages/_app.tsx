/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import type { AppProps } from 'next/app';
import StoreProvider from '../components/Store';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
