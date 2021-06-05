import {
  Grid,
  GridItem,
  Heading,
  Wrap,
  Tag,
  Tooltip,
  Divider,
  Text,
  Center,
  VStack,
} from '@chakra-ui/react';

import NextLink from 'next/link'

import type { Order } from '@lib/types';

export type Props = Order;
// w={["full", "full", "lg", "lg"]}
export const OrderItem = ({ title, departure, destination, tags, id }: Props) => {
  return (
    <Grid
      h="min-content"
      w="full"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      boxShadow="md"
      bg="white"
      p="2.5"
    >
      <GridItem colSpan={4} boxShadow="base" p="2.5" overflow="hidden">
        <Tooltip label={title}>
          <Heading size="md" as={NextLink} href={`/orders/${id}`} isTruncated maxWidth="4fr">
            {title}
          </Heading>
        </Tooltip>
      </GridItem>
      <GridItem rowStart={2} rowEnd={4} colSpan={4} boxShadow="base" p="2.5">
        <Wrap>
          {tags && tags.map((x) => (
            <Tag key={x.value}>{x.label}</Tag>
          ))}
        </Wrap>
      </GridItem>
      <GridItem rowSpan={3} colSpan={2} boxShadow="base">
        <Center w="full" h="full">
          <VStack>
            <Text>{departure}</Text>
            <Divider />
            <Text>{destination}</Text>
          </VStack>
        </Center>
      </GridItem>
    </Grid>
  );
};
