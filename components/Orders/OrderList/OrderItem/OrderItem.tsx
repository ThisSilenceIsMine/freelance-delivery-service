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
  Stack,
  useColorMode,
  Button,
} from '@chakra-ui/react';

import NextLink from 'next/link';

import type { Order } from '@lib/types';
export interface Props extends Order {
  btnTitle?: string;
  onClick?: (id: number | string) => void;
}


export const OrderItem = ({ title, departure, destination, tags, id, onClick, btnTitle }: Props) => {
  const { colorMode } = useColorMode();
  const darkModeStyleProps = colorMode === "dark" ? { background: "gray.700", borderRadius: "0.3em" } : {};
  return (
    <Grid
      // h="min-content"
      maxH="48"
      w="full"
      maxW="full"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      boxShadow="md"
      p="2.5"
      my="1.5"
      background={colorMode === 'dark' ? 'gray.700' : undefined}
    >
      <GridItem colSpan={4} boxShadow="base" p="2.5" overflow="hidden" {...darkModeStyleProps}>
        <Tooltip label={title}>
          <Heading size="md" as={NextLink} href={`/orders/${id}`} isTruncated maxWidth="4fr">
            {title}
          </Heading>
        </Tooltip>
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={4}
        colSpan={4}
        boxShadow="base"
        p="2.5"
        {...darkModeStyleProps}
      >
        <Wrap>{tags && tags.map((x) => <Tag key={x.value}>{x.label}</Tag>)}</Wrap>
      </GridItem>
      <GridItem rowSpan={3} colSpan={2} p="2.5" boxShadow="base" maxW="100%" {...darkModeStyleProps}>
        {onClick && (
          <Button colorScheme="green" variant="outline" w="full" onClick={() => onClick(id)}>
            {btnTitle ?? 'Виконано'}
          </Button>
        )}
        <Center w="full" h={onClick ? 'calc(100% - 40px)' : 'full'}>
          <Stack direction="column" maxW="full">
            <Text textAlign="center" isTruncated>
              {departure}
            </Text>
            <Divider />
            <Text textAlign="center" isTruncated>
              {destination}
            </Text>
          </Stack>
        </Center>
      </GridItem>
    </Grid>
  );
};
