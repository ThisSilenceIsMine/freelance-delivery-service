import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  Icon,
  InputLeftElement,
} from '@chakra-ui/react';
import { RiMapPin2Line, RiMapPin2Fill, RiPhoneLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { useCallback, FormEvent } from 'react';

import { Form } from '~/components/StyledForm';
import { useForm } from '~/hooks/useForm';
import { TagPicker } from '~/components/TagPicker';
import DatePicker from '~/components/DatePicker/DatePicker';
import { Order, Tag } from '@lib/types';

export enum MODE {
  DEPARTURE,
  DESTINATION,
}

type FormData = Order;

export interface Props {
  departure: string;
  destination: string;
  tags: Tag[];
  onFormSubmit: (_arg0: Partial<FormData>) => void;
  onModeChange: (_arg0: MODE) => void;
}

export const OrderForm = ({ departure, destination, tags, onFormSubmit, onModeChange }: Props) => {
  const { data, handleChange } = useForm<FormData>({ departure, destination });

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onFormSubmit(data);
    },
    [onFormSubmit, data]
  );

  return (
    <Form onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>Заголовок</FormLabel>
        <Input value={data.title ?? ''} onChange={(e) => handleChange('title', e.target.value)} />
      </FormControl>
      <TagPicker tags={tags} onTagsPicked={(tags) => handleChange('tags', tags)} />
      <FormControl isRequired>
        <FormLabel>Точка відправки</FormLabel>
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
          <Input readOnly value={departure} onClick={() => onModeChange(MODE.DEPARTURE)} />
        </InputGroup>
        <FormHelperText>*Виберіть місце на карті</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Точка призначення</FormLabel>
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
          <Input readOnly value={destination} onClick={() => onModeChange(MODE.DESTINATION)} />
        </InputGroup>
        <FormHelperText>*Виберіть місце на карті</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Дата</FormLabel>
        <DatePicker selectedDate={data.date} onChange={(date) => handleChange('date', date)} />
      </FormControl>
      <FormControl>
        <FormLabel>Бюджет</FormLabel>
        <InputGroup>
          <InputLeftAddon children={<Icon as={BiDollar} />} />
          <NumberInput
            precision={2}
            w="full"
            value={data.price}
            onChange={(value) => handleChange('price', value)}
          >
            <NumberInputField />
          </NumberInput>
        </InputGroup>
        <FormControl isRequired>
          <FormLabel>Номер телефону</FormLabel>
          <InputGroup>
            <InputLeftAddon children={<Icon as={RiPhoneLine} />} />
            <Input
              value={data.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </InputGroup>
        </FormControl>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Деталі замовлення</FormLabel>
        <Textarea
          value={data.description ?? ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </FormControl>
      <Button type="submit">Зберегти</Button>
    </Form>
  );
};

// interface FormData {
//   title: string;
//   departure: string;
//   destination: string;
//   date: Date;
//   tags: Tag[];
//   price: number;
//   description: string;
// }
// They're same. Why the fuck I'm not resuing alredy existing type?
/*
export interface Order {
  id: number | string;
  +title: string;
  +departure: string;
  +destination: string;
  +phoneNumber: string;
  +date?: Date;
  +tags?: Tag[];
  +price?: number;
  +description: string;
}
*/
