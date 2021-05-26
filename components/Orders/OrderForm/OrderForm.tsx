import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
} from '@chakra-ui/react';
import { useCallback } from 'react';

import { Form } from '~/components/StyledForm';
import { useForm } from '~/hooks/useForm';
import { TagPicker } from '~/components/TagPicker';
import DatePicker from '~/components/DatePicker/DatePicker';
import { Tag } from '@lib/types';

export enum MODE {
  DEPARTURE,
  DESTINATION,
}
export interface Props {
  departure: string;
  destination: string;
  tags: Tag[];
  onFormSubmit: (_arg0: Partial<FormData>) => void;
  onModeChange: (_arg0: MODE) => void;
}

export const OrderForm = ({ departure, destination, tags, onFormSubmit, onModeChange }: Props) => {
  const { data, handleChange } = useForm<FormData>({ departure, destination });

  const onSubmit = useCallback(() => {
    onFormSubmit(data);
   }, [onFormSubmit, data])

  return (
    <Form onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>Заголовок</FormLabel>
        <Input value={data.title} onChange={(e) => handleChange('title', e.target.value)} />
      </FormControl>
      <TagPicker tags={tags} onTagsPicked={(tags) => handleChange('tags', tags)} />
      <FormControl isRequired>
        <FormLabel>Точка відправки</FormLabel>
        <Input readOnly value={departure} onClick={() => onModeChange(MODE.DEPARTURE)} />
        <FormHelperText>*Виберіть місце на карті</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Точка призначення</FormLabel>
        <Input readOnly value={destination} onClick={() => onModeChange(MODE.DESTINATION)} />
        <FormHelperText>*Виберіть місце на карті</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Дата</FormLabel>
        <DatePicker selectedDate={data.date} onChange={(date) => handleChange('date', date)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Бюджет</FormLabel>
        <NumberInput precision={2}>
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Деталі замовлення</FormLabel>
        <Textarea
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </FormControl>
      <Button type="submit">Зберегти</Button>
    </Form>
  );
};

interface FormData {
  title: string;
  departure: string;
  destination: string;
  date: Date;
  tags: Tag[];
  price: number;
  description: string;
}
