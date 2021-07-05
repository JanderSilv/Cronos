import React from 'react'
import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </>
      )
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />

          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,700"
            rel="stylesheet"
          />

          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/assets/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/assets/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/assets/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/assets/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/assets/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/assets/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/assets/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/assets/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/assets/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/assets/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:title" content="Cronos" />
          <meta property="og:image" content="/assets/logo/Cronos_White.png" />
          <meta property="og:image:width" content="1024" />
          <meta property="og:image:height" content="538" />
          <meta property="og:site_name" content="Cronos" />
          {/* <meta property='og:url' content='https://timesheet.waproject.com.br/' /> */}
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta
            property="og:description"
            content="Cronos é um cronomêtro com gerenciamento de pausas e estado persistente."
          />
          <meta
            name="description"
            content="Cronos é um cronomêtro com gerenciamento de pausas e estado persistente."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
