import NextLink from 'next/link';
import { Button, Box, Flex, Heading, Link, Spacer, Stack, useColorMode } from '@chakra-ui/react';

import { NavLink } from './NavLink';
import { MenuDrawer } from '../MenuDrawer';
import { NotificationsMenu } from '~/components/Notifications';
import { useWindowDimensions } from '~/hooks/useWindowDimensions';
import { notifications } from '~/mock/Notifications.mock';
import { ColorModeSwitch } from '~/components/ColorModeSwitch';

export const Header = () => {
  const { colorMode } = useColorMode();
  return (
    // <Box w="100%" p="4" bg="white" boxShadow="md">
    <Flex
      w="100%"
      p="4"
      bg={colorMode === 'dark' ? 'gray.900' : 'orange'}
      direction={['column', 'column', 'row', 'row']}
      boxShadow="md"
      justify="flex-start"
      align="center"
    >
      <Box>
        <Heading fontFamily="fonts.logo" fontWeight="extrabold">
          ShipIT!
        </Heading>
      </Box>
      <Spacer />
      <Stack direction={['column', 'column', 'row', 'row']} spacing="1em">
        <NextLink href="/" passHref>
          <NavLink dark={colorMode === 'dark'}>Головна</NavLink>
        </NextLink>
        <NextLink href="/orders" passHref>
          <NavLink dark={colorMode === 'dark'}>Замовлення</NavLink>
        </NextLink>
        <NextLink href="/drivers" passHref>
          <NavLink dark={colorMode === 'dark'}>Водії</NavLink>
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
      <ColorModeSwitch mr="2" />
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
