import {
  Input,
  Button,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

import { TagPicker } from '~/components/TagPicker';
import { Form } from '~/components/StyledForm';
import { useForm } from '~/hooks/useForm';

import type { Driver, Tag } from '@lib/types';
import { useCallback } from 'react';

type FormData = Driver;

export interface Props {
  initialData?: FormData;
  tagOptions: Tag[];
  btnTitle?: string;
  onFormSubmit: (_argo0: Partial<FormData>) => void;
}

export const DriverProfile = ({ initialData, tagOptions, onFormSubmit, btnTitle }: Props) => {
  const { data, handleChange } = useForm<FormData>(initialData ?? {});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      onFormSubmit(data);
    },
    [onFormSubmit, data]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Stack direction="row">
        <FormControl w="70%">
          <FormLabel>Ім'я</FormLabel>
          <Input
            placeholder="Ваше ім'я?"
            w="full"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </FormControl>
        <FormControl w="30%">
          <FormLabel>Стаж</FormLabel>
          <NumberInput
            min={0}
            w="full"
            placeholder="Ваш стаж..."
            value={data.experience}
            onChange={(val) => handleChange('experience', val)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Stack>
      <TagPicker
        tags={tagOptions}
        initialTags={data.tags}
        onTagsPicked={(values) => handleChange('tags', values)}
      />
      <FormControl>
        <FormLabel>Деталі</FormLabel>
        <Textarea
          placeholder="Напишіть щось про себе..."
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </FormControl>
      <Button colorScheme="teal" mt="2" variant="outline" type="submit">
        {btnTitle ?? 'Зберегти'}
      </Button>
    </Form>
  );
};
