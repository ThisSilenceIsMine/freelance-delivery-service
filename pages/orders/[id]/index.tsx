import { Box, Stack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Order, Point } from '@lib/types';

import { Map } from '@components/Map';
import { OrderDisplay } from '@components/Orders/OrderDisplay/OrderDisplay';
import { getLatLng } from '@lib/Api/geocoding/geocoding';

import { api } from '@lib/Api/backend';
import { renameOrdersFrom } from '@lib/utils';
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';

interface Props {
  order: Order;
  isDriver: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  token: string;
}

export default function OrderDetails({ order, token, isAdmin, isOwner, isDriver }: Props) {
  const [departure, setDeparture] = useState<Point>();
  const [destination, setDestiation] = useState<Point>();

  console.log(order);

  useEffect(() => {
    (async () => {
      try {
        console.log(order);
        const dep = await getLatLng(order.departure);
        const dest = await getLatLng(order.destination);

        setDeparture(dep);
        setDestiation(dest);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Stack h="full" w="full" direction={['column', 'column', 'column', 'row']} p="4">
      <Box h="100vh-110px" w={['full', 'full', 'full', '40%']} boxShadow="md" p="4">
        <OrderDisplay {...{ isAdmin, isOwner, isDriver, token }} {...order} />
      </Box>
      <Box h="calc(100vh - 110px)" w={['full', 'full', 'full', '60%']} boxShadow="md">
        <Map
          isViewOnly={true}
          isDestination={false}
          initialDeparture={departure}
          initialDestination={destination}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}`}
          loadingElement={<Box h="full" />}
          containerElement={<Box w="full" h="full" />}
          mapElement={<Box h="full" />}
        />
      </Box>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  // console.log(context) // params.id
  const { accessToken: token } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile', 'email'],
  });
  const session = getSession(req, res);

  const { data: user } = await api.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const roles: string[] = session?.user['https://spring5-delivery.com/roles'] ?? [];
  
  
  const { data } = await api.get(`/public/advertisements/${params?.id}`);
  
  const order = renameOrdersFrom([data])[0];
  
  const isAdmin = !!roles.find(v => v === 'Admin');
  const isOwner = user.user_id === order.user_id;
  const isDriver = !isOwner && !!user?.user_metadata?.driver;

  console.log(`isAdmin: ${isAdmin}`);
  console.log(`isOwner: ${isOwner}`);
  console.log(`isDriver: ${isDriver}`);
  
  return {
    props: {
      order,
      token,
      isAdmin,
      isDriver,
      isOwner,
    },
  };
};
