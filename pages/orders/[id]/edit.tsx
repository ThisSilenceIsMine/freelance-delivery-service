import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Heading, Flex, Stack, Box } from '@chakra-ui/react';

import type { Order, Point } from '@lib/types';
import { Map } from '@components/Map';
import { OrderForm, MODE } from '@components/Orders/OrderForm/OrderForm';
import { tags, orders } from '~/mock';
import { getLatLng } from '@lib/Api/geocoding/geocoding';

interface Props {
  order: Order;
  departurePoint: Point;
  destinationPoint: Point;
}

export default function NewOrder({ order, departurePoint, destinationPoint}: Props) {
  const [departure, setDeparture] = useState(order.departure);
  const [destination, setDestinaion] = useState(order.destination);
  const [mode, setMode] = useState<MODE>(MODE.DEPARTURE);

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
          onFormSubmit={console.log}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context) // params.id

  const order: Order = orders[0];

  const departurePoint = await getLatLng(order.departure);
  const destinationPoint = await getLatLng(order.destination);

  return {
    props: {
      order: { ...order, price: 100, date: Date() },
      departurePoint,
      destinationPoint
    },
  };
};
