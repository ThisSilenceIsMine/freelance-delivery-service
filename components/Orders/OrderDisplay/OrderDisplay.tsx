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
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';

import { RiMapPin2Line, RiMapPin2Fill, RiPhoneLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { Order } from '~/lib/types';

// export interface Props {
//   order: Order;
// }

export type Props = Order;

export const OrderDisplay = ({
  id,
  title,
  tags,
  details,
  destination,
  departure,
  phoneNumber,
  date,
  price,
  description,
}: Props) => {
  return (
    <Stack direction="column">
      <Heading>{title}</Heading>
      {tags && (
        <Wrap p="2" boxShadow="base">
          {tags.map((x) => (
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
        <Input readOnly value={departure} />
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
        <Input readOnly value={destination} />
      </InputGroup>
      <Stack direction={['column', 'column', 'row', 'row']}>
        {date && (
          <InputGroup>
            <InputLeftAddon children={<Icon as={AiOutlineCalendar} />} />
            <Input readOnly value={date.toString()} />
          </InputGroup>
        )}
        {price && (
          <InputGroup>
            <InputLeftAddon children={<Icon as={BiDollar} />} />
            <Input readOnly value={price} />
          </InputGroup>
        )}
        <InputGroup>
          <InputLeftAddon children={<Icon as={RiPhoneLine} />} />
          <Input readOnly value={phoneNumber} />
        </InputGroup>
      </Stack>
      {details?.width && details?.height && details?.length && (
        <FormControl>
          <FormLabel>Розміри вантажу:</FormLabel>
          <Stack direction="row">
            <Input readOnly value={details?.width} />
            <Input readOnly value={details?.height} />
            <Input readOnly value={details?.length} />
          </Stack>
        </FormControl>
      )}
      {details?.weight && (
        <FormControl>
          <FormLabel>Вага вантажу (кг):</FormLabel>
          <Input readOnly value={details?.weight} />
        </FormControl>
      )}
      {details?.peopleCount && (
        <FormControl>
          <FormLabel>Кількість людей:</FormLabel>
          <Input readOnly value={details?.peopleCount} />
        </FormControl>
      )}

      <Text>{description}</Text>
    </Stack>
  );
};
