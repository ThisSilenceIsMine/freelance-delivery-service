import { css, Global, Theme, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { theme } from '../lib/theme'; //usage may change, if you want to implement theming

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme.LIGHT}>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

        `}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
