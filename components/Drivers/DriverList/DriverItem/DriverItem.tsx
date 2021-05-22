import { Grid, GridItem, Heading, Wrap, Tag, Tooltip } from '@chakra-ui/react';

import { useRef } from 'react';
import type { Driver } from '@lib/types';

export type Props = Driver;

export const DriverItem = ({ firstName, lastName, experience, tags }: Props) => {
  const fullName = useRef(`${firstName} ${lastName}`);

  return (
    <Grid
      h="min-content"
      w="full"
      templateRows="repeat(3, 1fr)"
      templateColumns="1fr"
      gap={4}
      boxShadow="md"
      bg="white"
      p="2.5"
    >
      <GridItem boxShadow="base" p="2.5" overflow="hidden">
        <Tooltip label={fullName.current}>
          <Heading size="md" isTruncated maxWidth="4fr">
            {`${fullName.current}, стаж ${experience} роки(-ів)`}
          </Heading>
        </Tooltip>
      </GridItem>
      <GridItem rowStart={2} rowEnd={4} boxShadow="base" p="2.5">
        <Wrap>
          {tags.map((x) => (
            <Tag>{x.label}</Tag>
          ))}
        </Wrap>
      </GridItem>
    </Grid>
  );
};
