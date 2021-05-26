import { useState } from 'react';
import { Container, Heading, Flex, Stack, Box } from '@chakra-ui/react';

import { Map } from '~/components/Map';
import { OrderForm, MODE } from '@components/Orders/OrderForm/OrderForm';
import { tags, orders } from '~/mock';

export default function NewOrder() {
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
    <Stack h="full" w="full" direction={['column', 'column', 'row', 'row']} p="4">
      <Box h="100vh-110px" w="40%" boxShadow="md" p="4">
        <OrderForm
          departure={departure}
          destination={destination}
          tags={tags}
          onFormSubmit={console.log}
          onModeChange={(m) => setMode(m)}
        />
      </Box>
      <Box h="calc(100vh - 110px)" w="60%" boxShadow="md">
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
