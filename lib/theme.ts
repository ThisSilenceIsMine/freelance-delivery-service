import { extendTheme } from '@chakra-ui/react';
export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    logo: 'Yanone Kaffeesatz',
    heading: 'Ubuntu',
    body: 'Montserrat',
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'Ubuntu',
      },
    },
  },
});

