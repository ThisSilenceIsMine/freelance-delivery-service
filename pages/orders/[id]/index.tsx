import {
  Box,
  Stack,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
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
import { useMutation } from 'react-query';

interface Props {
  order: any; //FIX_ME
  recommendedDrivers?: Driver[];
  isDriver: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  departurePoint: Point;
  destinationPoint: Point;
  respondedDrivers?: Driver[];
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
  destinationPoint,
  respondedDrivers,
}: Props) {
  const toast = useToast();

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
                  onClick={async (driverID) => {
                    try {
                      await appointDriver(order.id, driverID, token ?? '');
                      toast({
                        title: 'Успішно!',
                        description: 'Водія назначено як виконавця',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      });
                    } catch (error) {
                      toast({
                        title: 'Помилка!',
                        description: 'Щось пішло не так',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      });
                    }
                  }}
                  drivers={respondedDrivers ?? []}
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

  let { data: rawOrder } = await api.get(`/public/advertisements/${params?.id}`);

  const order = renameOrdersFrom([rawOrder])[0];

  if (!session) {
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

  const isAdmin = !!roles.find((v) => v === 'Admin');
  const isOwner = user.user_id === rawOrder.user_id;
  const isDriver = !isOwner && !!user?.user_metadata?.driver;

  // if (isOwner) {
  //   let { data } = await api.get(`/user/advertisements/${params?.id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log('data :>> ', data);
  //   rawOrder = data;
  // }

  let recommendedDrivers = [];

  if (isOwner) {
    const { data: rawRecommended } = await api.get('/public/advertisements/recommended/', {
      params: {
        advertisement_id: params?.id,
      },
    });

    recommendedDrivers = renameDriversFrom(rawRecommended);
  }

  const departurePoint = await getLatLng(order.departure);
  const destinationPoint = await getLatLng(order.destination);

  console.log('order.responded :>> ', order.responded);
  const respondedDrivers = await fetchDriversByIds(order.responded);
  console.log('respondedDrivers :>> ', respondedDrivers);
  return {
    props: {
      order,
      departurePoint,
      destinationPoint,
      respondedDrivers,
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

async function fetchDriversByIds(ids: number[]) {
  let drivers: any[] = [];
  // ids.forEach(async (id) => {
  //   const { data } = await api.get(`/public/drivers/${id}`);
  //   console.log(`Driver in forEach:`, data)
  //   drivers = [...drivers, data];
  // });
  for (const id of ids) {
      const { data } = await api.get(`/public/drivers/${id}`);
      console.log(`Driver in forEach:`, data)
      drivers = [...drivers, data];
  }
  console.log('drivers :>> ', drivers);
  return renameDriversFrom(drivers);
}