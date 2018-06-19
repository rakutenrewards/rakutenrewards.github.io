import App, { Container } from 'next/app';
import React from 'react';
import Navbar from '../components/navbar';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Navbar />
        <Component {...pageProps} />
      </Container>
    );
  }
}
