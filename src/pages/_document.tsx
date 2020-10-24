import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document
