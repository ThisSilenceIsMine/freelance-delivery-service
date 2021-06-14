import NextLink from 'next/link';
import { Button, Box, Flex, Heading, Link, Spacer, Stack, useColorMode, IconButton } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { NavLink } from './NavLink';
import { MenuDrawer } from '../MenuDrawer';
import { NotificationsMenu } from '~/components/Notifications';
import { useWindowDimensions } from '~/hooks/useWindowDimensions';
import { notifications } from '~/mock/Notifications.mock';
import { ColorModeSwitch } from '~/components/ColorModeSwitch';
import { useUser } from '@auth0/nextjs-auth0';
import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from 'react-query';
import { Notification } from '@lib/types';
import { renameNotificationsFrom } from '@lib/utils';
import { api } from '@lib/Api/backend';

interface Props {
  initialNotifications?: Notification[];
  token?: string;
}


export const Header = ({ initialNotifications, token }: Props) => {
  const queryClient = useQueryClient();
  const { data, refetch, isLoading: isFetching } = useQuery(['notifications', token], fetchNotifications, {
    initialData: initialNotifications,
    enabled: !!token
  });
  const { mutate, isLoading: isMutating } = useMutation(dismiss, {
    onSuccess: () => queryClient.invalidateQueries('notifications'),
  });
  const { user } = useUser();
  const { colorMode } = useColorMode();
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
      </Stack>
      <Spacer />
      <ColorModeSwitch />
      {user ? (
        <>
          <NotificationsMenu
            onDismiss={(id) => !isMutating && token && mutate({ id, token })}
            notifications={data ?? []}
            isLoading={isMutating || isFetching}
          />
          <NextLink href="/profile">
            <Button variant="outline" ml="2" colorScheme="black">
              Профіль
            </Button>
          </NextLink>
          <NextLink href="/orders/new">
            <Button as={IconButton} icon={<AiOutlinePlus/>} variant="outline" ml="2" colorScheme="green">
              Створити замовлення
            </Button>
          </NextLink>
        </>
      ) : (
        <>
          <Button as={Link} href="/api/auth/login" variant="base" colorScheme="teal">
            Вхід
          </Button>
        </>
      )}
    </Flex>
    // </Box>
  );
};

interface __Props {
  token?: string;
}

export const ResponsiveHeader = ({ token }: __Props) => {
  const { width } = useWindowDimensions();

  if (width && width <= 768) {
    //roughly equals to 62em assuming font-size is 16px
    return (
      <MenuDrawer>
        <Header token={token} />
      </MenuDrawer>
    );
  }

  return <Header token={token} />;
};

async function fetchNotifications({ queryKey }: QueryFunctionContext) {
  const [_key, token] = queryKey as [string, string];
  const { data: notifications } = await api.get('/user/notifications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return renameNotificationsFrom(notifications);
}

async function dismiss({ id, token }:{ id: number | string, token: string}) {
  try {
    api.delete(`/user/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
  } catch (error) {
    console.error(error)
  }
}