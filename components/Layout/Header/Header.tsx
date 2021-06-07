import NextLink from 'next/link';
import { Button, Box, Flex, Heading, Link, Spacer, Stack, useColorMode } from '@chakra-ui/react';

import { NavLink } from './NavLink';
import { MenuDrawer } from '../MenuDrawer';
import { NotificationsMenu } from '~/components/Notifications';
import { useWindowDimensions } from '~/hooks/useWindowDimensions';
import { notifications } from '~/mock/Notifications.mock';
import { ColorModeSwitch } from '~/components/ColorModeSwitch';
import { useUser } from '@auth0/nextjs-auth0';

export const Header = () => {
  const { colorMode } = useColorMode();
  const { user, error, isLoading } = useUser();
  return (
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
      <ColorModeSwitch mr="2" />
      {user ? (
        <>
          <NotificationsMenu notifications={notifications} />
          <NextLink href="/profile">
            <Button variant="outline" colorScheme="black">
              Профіль
            </Button>
          </NextLink>
          <NextLink href="/api/auth/logout">
            <Button variant="outline" colorScheme="orange">
              Вихід
            </Button>
          </NextLink>
        </>
      ) : (
        <>
          {/* <NextLink href="/api/auth/login"> */}
          <Button as={Link} href="/api/auth/login" variant="base" colorScheme="teal">
            Вхід
          </Button>
          {/* </NextLink> */}
          <NextLink href="/api/auth/register">
            <Button variant="outline" colorScheme="orange">
              Реєстрація
            </Button>
          </NextLink>
        </>
      )}
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
