import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Heading, Flex, Stack, Box, useToast } from '@chakra-ui/react';

import { api } from '@lib/Api/backend';
import { renameOrdersFrom, renameOrdersTo, renameTagsFrom, renameTagsTo } from '@lib/utils';
import type { Order, Point } from '@lib/types';
import { Map } from '@components/Map';
import { OrderForm, MODE } from '@components/Orders/OrderForm/OrderForm';
import { tags, orders } from '~/mock';
import { getLatLng } from '@lib/Api/geocoding/geocoding';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useMutation } from 'react-query';

interface Props {
  order: Order;
  departurePoint: Point;
  destinationPoint: Point;
  token: string;
}

const updateOrder = async ({
  order,
  token,
  id,
}: {
  order: Partial<Order>;
  token: string;
  id: string | number;
}) => {
  const orderData = renameOrdersTo([order])[0];

  return api.patch(
    `/user/advertisements/${id}`,
    {
      ...orderData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default function NewOrder({ order, departurePoint, destinationPoint, token }: Props) {
  const [departure, setDeparture] = useState(order.departure);
  const [destination, setDestinaion] = useState(order.destination);
  const [mode, setMode] = useState<MODE>(MODE.DEPARTURE);
  const toast = useToast();
  const { mutate } = useMutation(updateOrder, {
    onSuccess: () => {
      toast({
        title: 'Успішно!',
        description: 'Оголошення було оновлено',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Помилка!',
        description: 'Щось пішло не так. Перевірте вхідні дані.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onPlacePicked = (place: string) => {
    console.log(`Picked ${place} as ${MODE[mode]}`);
    if (mode === MODE.DEPARTURE) {
      setDeparture(place);
    } else {
      setDestinaion(place);
    }
  };

  return (
    <Stack h="full" w="full" direction={['column', 'column', 'column', 'row']} p="4">
      <Box h="100vh-110px" w={['full', 'full', 'full', '40%']} boxShadow="md" p="4">
        <OrderForm
          initialOrder={order}
          departure={departure}
          destination={destination}
          tags={tags}
          onFormSubmit={(order) => mutate({ order, token, id: order.id ?? -1 })}
          onModeChange={(m) => setMode(m)}
        />
      </Box>
      <Box h="calc(100vh - 110px)" w={['full', 'full', 'full', '60%']} boxShadow="md">
        <Map
          isDestination={mode === MODE.DESTINATION}
          initialDeparture={departurePoint}
          initialDestination={destinationPoint}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}`}
          loadingElement={<Box h="full" />}
          containerElement={<Box w="full" h="full" />}
          mapElement={<Box h="full" />}
          onPlacePicked={onPlacePicked}
        />
      </Box>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  // console.log(context) // params.id
  try {
    const { data } = await api.get(`/public/advertisements/${params?.id}`);

    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile', 'email'],
    });

    const order = renameOrdersFrom([data])[0];

    console.log(data);

    const departurePoint = await getLatLng(order.departure);
    const destinationPoint = await getLatLng(order.destination);

    return {
      props: {
        order,
        departurePoint,
        destinationPoint,
        token: accessToken,
      },
    };
  } catch (error) {
    res.writeHead(302, {
      Location: '/api/auth/login',
    });
    res.end();
    return {
      props: {},
    };
  }
};
