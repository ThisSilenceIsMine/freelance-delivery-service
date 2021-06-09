import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Box, Stack } from '@chakra-ui/react';
import { Order, Point } from '@lib/types';

import { Map } from '@components/Map';
import { OrderDisplay } from '@components/Orders/OrderDisplay/OrderDisplay';
import { getLatLng } from '@lib/Api/geocoding/geocoding';

import { api } from '@lib/Api/backend';
import { renameOrdersFrom } from '@lib/utils';

interface Props {
  order: Order;
}

export default function OrderDetails({ order }: Props) {
    const [departure, setDeparture] = useState<Point>();
    const [destination, setDestiation] = useState<Point>();

    console.log(order)
  
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
        <OrderDisplay {...order} />
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

  const { data } = await api.get(`/public/advertisements/${context?.params?.id}`);

  const order: Order = renameOrdersFrom([data])[0];

  return {
    props: {
      order,
    },
  };
};
