import { Box, Container, Wrap, Tag, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { orders, tags } from 'mock';
import { Order } from '@lib/types';

interface Props {
  order: Order;
}

export default function Driver({ order }: Props) {
  let driver: any;
  return (
    <Container maxW="container.xl">

    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context) // params.id

  const order: Order = orders[0];

  return {
    props: {
      order,
    },
  };
};
