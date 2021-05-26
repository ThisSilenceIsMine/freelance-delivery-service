import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, Map } from './Map';
import { Box } from '@chakra-ui/react';

export default {
  title: 'Map',
  component: Map,
};

const Template: Story<Props> = (args) => (
  <Box h="400px" boxShadow="base">
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}`}
      loadingElement={<Box h="full" />}
      containerElement={<Box h="full" />}
      mapElement={<Box h="full" />}
      {...args}
    />
  </Box>
);

export const Default = Template.bind({});

Default.args = {
  isDestination: false, 
  onPlacePicked: console.log
}