import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, getAccessToken } from '@auth0/nextjs-auth0';
import { Container, Heading, Flex, Stack, Box } from '@chakra-ui/react';
import { useMutation, useQueryClient, useQuery, QueryFunctionContext } from 'react-query';

import { api } from '@lib/Api/backend';
import { renameOrdersFrom, renameOrdersTo, renameTagsFrom, renameTagsTo } from '@lib/utils';

import { Map } from '~/components/Map';
import { OrderForm, MODE } from '@components/Orders/OrderForm/OrderForm';
import { tags, orders } from '~/mock';
import { Order, Tag } from '@lib/types';

interface Props {
  token: string;
  tags: Tag[];
}

const createOrder = async (order: Partial<Order>, token: string) => {
  try {

    const orderData = renameOrdersTo([order])[0];

    api.post('/user/advertisements', {
      ...orderData
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error)
  }
}

export default function NewOrder({ token, tags }:Props) {
  const [departure, setDeparture] = useState("");
  const [destination, setDestinaion] = useState("");
  const [mode, setMode] = useState<MODE>(MODE.DEPARTURE)

  const onPlacePicked = (place: string) => {
    console.log(`Picked ${place} for ${MODE[mode]}`)
    if(mode === MODE.DEPARTURE) {
      setDeparture(place)
    } else {
      setDestinaion(place)
    }
  }

  return (
    <Stack h="full" w="full" direction={['column', 'column', 'column', 'row']} p="4">
      <Box h="100vh-110px" w={['full', 'full', 'full', '40%']} boxShadow="md" p="4">
        <OrderForm
          departure={departure}
          destination={destination}
          tags={tags}
          onFormSubmit={(order) => createOrder(order, token)}
          onModeChange={(m) => setMode(m)}
        />
      </Box>
      <Box h="calc(100vh - 110px)" w={['full', 'full', 'full', '60%']} boxShadow="md">
        <Map
          isDestination={mode === MODE.DESTINATION}
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile', 'email'],
    });

    const { data: _tags } = await api.get('/public/types');
    const tags = renameTagsFrom(_tags);
    return {
      props: {
        tags,
        token: accessToken,
      },
     };
     
  } catch (error) {
    console.log('Whoops! Token f*d up!');
    return { props: {} };
  }


}