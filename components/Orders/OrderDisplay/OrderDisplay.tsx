import {
  Heading,
  Button,
  Wrap,
  Tag,
  Input,
  InputLeftAddon,
  InputGroup,
  Stack,
  Icon,
  Text,
} from '@chakra-ui/react';

import { RiMapPin2Line, RiMapPin2Fill, RiPhoneLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { Order } from '~/lib/types';

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
            <InputLeftAddon children={<Icon as={AiOutlineCalendar} />} />
            <Input readOnly value={order.date.toString()} />
          </InputGroup>
        )}
        {order.price && (
          <InputGroup>
            <InputLeftAddon children={<Icon as={BiDollar} />} />
            <Input readOnly value={order.price} />
          </InputGroup>
        )}
        <InputGroup>
          <InputLeftAddon children={<Icon as={RiPhoneLine} />} />
          <Input readOnly value={order.phoneNumber} />
        </InputGroup>
      </Stack>
      <Text>{order.description}</Text>
    </Stack>
  );
};
