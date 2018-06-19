import Document, { Head, Main, NextScript } from 'next/document';
import '../node_modules/bulma/bulma.sass';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
