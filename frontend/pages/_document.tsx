import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";

import * as gtag from "../lib/gtag";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    const sheet = new ServerStyleSheet();

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>,
      ],
    };
  }
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="shortcut icon" href="/favicon1.ico" />
          <meta
            name="description"
            content="개발자 필수 영어단어를 학습할 수 있는 웹 서비스입니다."
          />
        </Head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
