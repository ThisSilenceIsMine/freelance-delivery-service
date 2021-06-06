import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ResponsiveHeader as Header } from '@components/Layout/Header';

import 'react-datepicker/dist/react-datepicker.css';
import '~/components/DatePicker/DatePicker.css';

import '@fontsource/ubuntu';
import '@fontsource/montserrat';
import '@fontsource/yanone-kaffeesatz';
import { theme } from "@lib/theme"
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
