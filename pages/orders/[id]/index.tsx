import { Box, Stack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';

import { Driver, Order, Point } from '@lib/types';
import { Order as _Order, Driver as _Driver } from '@lib/Api/BackendTypes';
import { Map } from '@components/Map';
import { OrderDisplay } from '@components/Orders/OrderDisplay/OrderDisplay';
import { getLatLng } from '@lib/Api/geocoding/geocoding';

import { api } from '@lib/Api/backend';
import { renameDriversFrom, renameOrdersFrom } from '@lib/utils';
import { DriverList } from '@components/Drivers';

interface Props {
  order: any; //FIX_ME
  recommendedDrivers?: Driver[];
  isDriver: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  departurePoint: Point;
  destinationPoint: Point;
  token?: string;
}

export default function OrderDetails({
  order,
  token,
  recommendedDrivers,
  isAdmin,
  isOwner,
  isDriver,
  departurePoint,
  destinationPoint
}: Props) {
  // const [departure, setDeparture] = useState<Point>();
  // const [destination, setDestiation] = useState<Point>();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const dep = await getLatLng(order.departure);
  //       const dest = await getLatLng(order.destination);

  //       setDeparture(dep);
  //       setDestiation(dest);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  return (
    <Stack h="full" w="full" direction={['column', 'column', 'column', 'row']} p="4">
      <VStack
        overflowY="scroll"
        h="100vh-110px"
        w={['full', 'full', 'full', '40%']}
        boxShadow="md"
        p="4"
      >
        <OrderDisplay {...{ isAdmin, isOwner, isDriver, token }} {...order} />
        {isOwner && (
          <Tabs isFitted w="full">
            <TabList>
              <Tab>Відгукнулись</Tab>
              <Tab>Рекомендовані водії</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DriverList
                  onClick={(driverID) => appointDriver(order.id, driverID, token ?? '')}
                  drivers={renameDriversFrom(order?.responded) ?? []}
                />
              </TabPanel>
              <TabPanel>
                <DriverList drivers={recommendedDrivers ?? []} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </VStack>
      <Box h="calc(100vh - 110px)" w={['full', 'full', 'full', '60%']} boxShadow="md">
        <Map
          isViewOnly={true}
          isDestination={false}
          initialDeparture={departurePoint}
          initialDestination={destinationPoint}
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
  const session = getSession(req, res);

  if (!session) {
    const { data: rawOrder } = await api.get(`/public/advertisements/${params?.id}`);

    const order = renameOrdersFrom([rawOrder])[0];
    return {
      props: {
        order,
        isAdmin: false,
        isOwner: false,
        isDriver: false,
        recommendedDrivers: [],
      },
    };
  }

  const { accessToken: token } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile', 'email'],
  });

  const { data: user } = await api.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const roles: string[] = session?.user['https://spring5-delivery.com/roles'] ?? [];

  const { data: rawOrder } = await api.get(`/user/advertisements/${params?.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data: rawRecommended } = await api.get('/public/advertisements/recommended/', {
    params: {
      advertisement_id: params?.id,
    },
  });

  const order = renameOrdersFrom([rawOrder])[0];
  const recommendedDrivers = renameDriversFrom(rawRecommended);

      const departurePoint = await getLatLng(order.departure);
      const destinationPoint = await getLatLng(order.destination);

  const isAdmin = !!roles.find((v) => v === 'Admin');
  const isOwner = user.user_id === order.user_id;
  const isDriver = !isOwner && !!user?.user_metadata?.driver;

  return {
    props: {
      order,
      departurePoint,
      destinationPoint,
      token,
      isAdmin,
      isDriver,
      isOwner,
      recommendedDrivers,
    },
  };
};

async function appointDriver(orderID: number | string, driverID: number | string, token: string) {
  try {
    await api.get('/user/advertisements/appoint', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        driver_id: driverID,
        advertisement_id: orderID,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
