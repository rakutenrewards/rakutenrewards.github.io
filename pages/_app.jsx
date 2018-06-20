// this is the general template for pages
import App, { Container } from 'next/app';
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </Container>
    );
  }
}
