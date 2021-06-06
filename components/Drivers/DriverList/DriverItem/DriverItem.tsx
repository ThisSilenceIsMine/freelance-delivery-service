import { Grid, GridItem, Heading, Wrap, Tag, Tooltip, useColorMode, Button, Flex, Spacer } from '@chakra-ui/react';

import { useRef } from 'react';
import NextLink from 'next/link'

import type { Driver } from '@lib/types';

export interface Props extends Driver {
  onClick?: (_arg0: string | number) => void;
}

export const DriverItem = ({ fullName, experience, tags, id, onClick }: Props) => {
  const { colorMode } = useColorMode();
   const darkModeStyleProps =
     colorMode === 'dark' ? { background: 'gray.700', borderRadius: '0.3em' } : {};
  return (
    <Grid
      h="min-content"
      w="full"
      templateRows="repeat(3, 1fr)"
      templateColumns="1fr"
      gap={4}
      boxShadow="md"
      p="2.5"
      my="1.5"
      background={colorMode === 'dark' ? 'gray.700' : undefined}
    >
      <GridItem boxShadow="base" p="2.5" overflow="hidden" {...darkModeStyleProps}>
        <Flex>
          <Tooltip label={fullName}>
            <Heading size="md" as={NextLink} href={`/drivers/${id}`} isTruncated maxWidth="4fr">
              {`${fullName}, стаж ${experience} роки(-ів)`}
            </Heading>
          </Tooltip>
          <Spacer/>
          {onClick && (
            <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onClick(id)}>
              Призначити
            </Button>
          )}
        </Flex>
      </GridItem>
      <GridItem rowStart={2} rowEnd={4} boxShadow="base" p="2.5" {...darkModeStyleProps}>
        <Wrap>
          {tags.map((x) => (
            <Tag key={x.value}>{x.label}</Tag>
          ))}
        </Wrap>
      </GridItem>
    </Grid>
  );
};
