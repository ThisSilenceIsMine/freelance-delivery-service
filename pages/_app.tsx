import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react'
import { ResponsiveHeader as Header } from '@components/Header';

import '@fontsource/ubuntu';
import '@fontsource/montserrat';
import { theme } from "@lib/theme"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
