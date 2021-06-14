import { extendTheme } from '@chakra-ui/react';
export const theme = extendTheme({
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

