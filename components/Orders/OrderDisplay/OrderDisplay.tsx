import {
  Box,
  Heading,
  Button,
  Wrap,
  Tag,
  Input,
  InputRightAddon,
  InputLeftAddon,
  InputGroup,
  Flex,
  Stack,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiMapPin2Line, RiMapPin2Fill } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { Order, Point } from '~/lib/types';
import { getLatLng } from '@lib/Api/geocoding/geocoding';

export interface Props {
  order: Order;
}

export const OrderDisplay = ({ order }: Props) => {

  return (
    <Stack direction="column">
      <Heading>{order.title}</Heading>
      {order.tags && (
        <Wrap p="2" boxShadow="base">
          {order.tags.map((x) => (
            <Tag key={x.value}>{x.label}</Tag>
          ))}
        </Wrap>
      )}
      <InputGroup>
        <InputLeftAddon
          minW="80px"
          children={
            <>
              <Icon as={RiMapPin2Line} mr="2" />
              <Text>З</Text>
            </>
          }
        />
        <Input readOnly value={order.departure} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon
          minW="80px"
          children={
            <>
              <Icon as={RiMapPin2Fill} mr="2" />
              <Text>До</Text>
            </>
          }
        />
        <Input readOnly value={order.destination} />
      </InputGroup>
      <Stack direction={['column', 'column', 'row', 'row']}>
        {order.date && (
          <InputGroup>
            <Input readOnly value={order.date.toString()} />
            <InputRightAddon children={<Icon as={AiOutlineCalendar} />} />
          </InputGroup>
        )}
        {order.price && (
          <InputGroup>
            <Input readOnly value={order.price} />
            <InputRightAddon children={<Icon as={BiDollar} />} />
          </InputGroup>
        )}
      </Stack>
      <Text>{order.description}</Text>
    </Stack>
  );
};
