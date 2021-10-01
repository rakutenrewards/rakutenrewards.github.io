// this is the template for all pages
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Rakuten is built on top of many open source technologies. Here are some of the tools and libraries we have developed to give back to the community." />
          <meta name="author" content="Rakuten" />
          <link rel="icon" type="image/png" href="https://static.ebates.com/static/images/favicons-r/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="https://static.ebates.com/static/images/favicons-r/favicon-57x57.png" sizes="57x57" />
          <link rel="icon" type="image/png" href="https://static.ebates.com/static/images/favicons-r/favicon-72x72.png" sizes="72x72" />
          <link rel="icon" type="image/png" href="https://static.ebates.com/static/images/favicons-r/favicon-76x76.png" sizes="76x76" />
          <title>Open Source @ Rakuten Rewards</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
