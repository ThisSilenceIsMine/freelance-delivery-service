import NextLink from 'next/link';
import { Button, Box, Flex, Heading, Link, Spacer, Stack } from '@chakra-ui/react';

import { NavLink } from './NavLink';
import { MenuDrawer } from '../MenuDrawer';
import { NotificationsMenu } from '~/components/Notifications';
import { useWindowDimensions } from '~/hooks/useWindowDimensions';
import { notifications } from '~/mock/Notifications.mock';

export const Header = () => {
  return (
    // <Box w="100%" p="4" bg="white" boxShadow="md">
    <Flex
      w="100%"
      p="4"
      bg="orange"
      direction={['column', 'column', 'row', 'row']}
      boxShadow="md"
      justify="flex-start"
      align="center"
    >
      <Box>
        <Heading>ShipIT!</Heading>
      </Box>
      <Spacer />
      <Stack direction={['column', 'column', 'row', 'row']} spacing="1em">
        <NextLink href="/" passHref>
          <NavLink>Головна</NavLink>
        </NextLink>
        <NextLink href="/orders" passHref>
          <NavLink>Замовлення</NavLink>
        </NextLink>
        <NextLink href="/drivers" passHref>
          <NavLink>Водії</NavLink>
        </NextLink>
        {/* <Link as={NextLink} href="/orders">
          Orders
        </Link> */}

        {/*         
        <Link as={NextLink} href="/drivers">
          Drivers
        </Link>
        <Link as={NextLink} href="/about">
          About
        </Link> */}
      </Stack>
      <Spacer />
      <NotificationsMenu notifications={notifications} />
      <NextLink href="/profile">
        <Button variant="outline" colorScheme="black">
          Профіль
        </Button>
      </NextLink>
      {/* <Button variant="base" colorScheme="teal"> 
        Login
      </Button>
      <Button variant="outline" colorScheme="orange">
        Sign In
      </Button> */}
    </Flex>
    // </Box>
  );
};

export const ResponsiveHeader = () => {
  const { width } = useWindowDimensions();

  if (width && width <= 768) {
    //roughly equals to 62em assuming font-size is 16px
    return (
      <MenuDrawer>
        <Header />
      </MenuDrawer>
    );
  }

  return <Header />;
};
