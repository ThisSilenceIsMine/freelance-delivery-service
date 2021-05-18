import {
  Grid,
  GridItem
} from "@chakra-ui/react"

interface Props {
  
}

export const OrderItem = (props: Props) => {
  return (
    <Grid
      h="2xs"
      w="lg"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      boxShadow="md"
      bg="white"
      p="2.5"
    >
      <GridItem colSpan={4} bg="papayawhip" />
      <GridItem rowStart={2} rowEnd={4} colSpan={4} bg="teal" />
      <GridItem rowSpan={3} colSpan={2} bg="tomato" />
    </Grid>
  );
}