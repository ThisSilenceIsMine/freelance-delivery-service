import { Container, Stack } from "@chakra-ui/react";

import { DriversFilter, DriverList } from '@components/Drivers';

import { tags, drivers } from 'mock';


export default function Drivers() {
    return (
      <Container maxW="container.xl">
        <Stack
          direction={['column', 'column', 'column', 'row']}
          my="2.5"
          align="flex-start"
          spacing={['4', '4', '2.5', '2.5']}
        >
          <DriversFilter tagOptions={tags} onFilterSubmit={() => {}} />
          <DriverList drivers={drivers} />
        </Stack>
      </Container>
    );
}