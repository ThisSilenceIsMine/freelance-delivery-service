import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Box, Stack } from '@chakra-ui/react';

import { orders, tags } from 'mock';
import { Order as IOrder, Point } from '@lib/types';

import { Map } from '@components/Map';
import { OrderDisplay } from '@components/Orders/OrderDisplay/OrderDisplay';
import { getLatLng } from '@lib/Api/geocoding/geocoding';
import { RiContrastDropLine } from 'react-icons/ri';

interface Props {
  order: IOrder;
}

export default function Order({ order }: Props) {
    const [departure, setDeparture] = useState<Point>();
    const [destination, setDestiation] = useState<Point>();

    useEffect(() => {
      (async () => {
        try {
          console.log(order);
          const dep = await getLatLng(order.departure);
          const dest = await getLatLng(order.destination);

          console.log({dep, dest})
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
        <OrderDisplay order={order} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context) // params.id

  const order: IOrder = orders[0];

  return {
    props: {
      order: { ...order, price: 100 },
    },
  };
};
