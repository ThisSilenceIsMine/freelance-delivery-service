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
import { UserProvider } from '@auth0/nextjs-auth0';


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
