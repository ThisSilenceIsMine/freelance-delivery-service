import {
  Container,
  Heading,
  Flex,
  Stack
} from '@chakra-ui/react';

import { OrderList, OrdersFilter } from '@components/Orders';

import {tags, orders} from '../../mock'

export default function Orders() {
  return (
    <Container maxW="container.xl">
      <Stack direction={["column", "column", "column", "row"]} my="2.5" align="flex-start" spacing={["4","4","2.5","2.5"]}>
        <OrdersFilter tagOptions={tags} onFilterSubmit={() => {}} sticky />
        <OrderList orders={orders} />
      </Stack>
    </Container>
  );
}
