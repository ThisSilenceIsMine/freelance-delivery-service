import App from 'next/app'
import Router from 'next/router';
import { AppContext, AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ResponsiveHeader as Header } from '@components/Layout/Header';

import 'react-datepicker/dist/react-datepicker.css';
import '~/components/DatePicker/DatePicker.css';

import '@fontsource/ubuntu';
import '@fontsource/montserrat';
import '@fontsource/yanone-kaffeesatz';
import { theme } from "@lib/theme"
import { QueryClient, QueryClientProvider } from 'react-query';
import { getAccessToken, UserProvider } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';

import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());  


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // const { token } = pageProps;
  const [token, setToken] = useState(pageProps.token);
  useEffect(() => {
    if (pageProps.token) {
      
      setToken(pageProps.token);
    }
  }, [pageProps])

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Header token={token}  />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  try {
  
  const req = appContext.ctx.req;
  const res = appContext.ctx.res;

  if (!req || !res) {
    console.log("Returning default app props")
    return { ...appProps }; 
  }
    const { accessToken } = await getAccessToken(req, res);
    appProps.pageProps.token = accessToken;
    return { ...appProps };
    
  } catch (error) {
    return { ...appProps };
  }
};


export default MyApp;
