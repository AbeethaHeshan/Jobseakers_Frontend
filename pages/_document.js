import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
         <link rel="preconnect" href="https://fonts.googleapis.com"/>
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
         <link href="https://fonts.googleapis.com/css2?family=Catamaran&display=swap" rel="stylesheet"/>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
