import { Box, Container, Wrap, Tag, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next'

import { tags } from 'mock';
import { Driver as IDriver } from '@lib/types';

interface Props {
  driver: IDriver;
}

export default function Driver({ driver }: Props) {

  return (
    <Container maxW="container.xl">
      <Box p="4" boxShadow="md">
        <Heading>{driver.fullName}</Heading>
        <Text>{`Стаж ${driver.experience} роки(-ів)`}</Text>
        <Wrap mt="2.5">
          {driver.tags.map((x) => (
            <Tag key={x.value}>{x.label}</Tag>
          ))}
        </Wrap>
      </Box>
      <Box p="4" boxShadow="xs" h="full" w="full">
        <Text>{driver.description}</Text>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context) // params.id
  
  const driver: IDriver = {
    id: "somerandomidgoesthere",
    experience: "5",
    fullName: "Виталий Волочай",
    tags: tags,
    description: "Как-то раз я невзначай..."
  };//await fetch('https://.../posts');

  return {
    props: {
      driver,
    },
  };
}