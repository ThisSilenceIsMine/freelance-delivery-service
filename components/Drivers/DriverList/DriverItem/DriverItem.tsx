import { Grid, GridItem, Heading, Wrap, Tag, Tooltip } from '@chakra-ui/react';

import { useRef } from 'react';
import NextLink from 'next/link'

import type { Driver } from '@lib/types';

export type Props = Driver;

export const DriverItem = ({ fullName, experience, tags, id }: Props) => {
  return (
    <Grid
      h="min-content"
      w="full"
      templateRows="repeat(3, 1fr)"
      templateColumns="1fr"
      gap={4}
      boxShadow="md"
      p="2.5"
    >
      <GridItem boxShadow="base" p="2.5" overflow="hidden">
        <Tooltip label={fullName}>
          <Heading size="md" as={NextLink} href={`/drivers/${id}`} isTruncated maxWidth="4fr">
            {`${fullName}, стаж ${experience} роки(-ів)`}
          </Heading>
        </Tooltip>
      </GridItem>
      <GridItem rowStart={2} rowEnd={4} boxShadow="base" p="2.5">
        <Wrap>
          {tags.map((x) => (
            <Tag key={x.value}>{x.label}</Tag>
          ))}
        </Wrap>
      </GridItem>
    </Grid>
  );
};
