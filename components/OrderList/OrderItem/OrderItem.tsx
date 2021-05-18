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
  VStack
} from "@chakra-ui/react"

import type { Order } from "@lib/types"

export type Props = Order;

export const OrderItem = ({title, departure, destination, tags}: Props) => {
  return (
    <Grid
      h="min-content"
      w={["full", "full", "lg", "lg"]}
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      boxShadow="md"
      bg="white"
      p="2.5"
    >
      <GridItem colSpan={4} boxShadow="base" p="2.5" overflow="hidden">
        <Tooltip label={title}>
          <Heading size="md" isTruncated maxWidth="4fr">
            {title}
          </Heading>
        </Tooltip>
      </GridItem>
      <GridItem rowStart={2} rowEnd={4} colSpan={4} boxShadow="base" p="2.5">
        <Wrap>
          {tags.map((x) => (
            <Tag>{x.label}</Tag>
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
}