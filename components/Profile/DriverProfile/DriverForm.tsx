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
import React, { useCallback, forwardRef } from 'react';

type FormData = Driver;

export interface Props {
  initialData?: FormData;
  tagOptions: Tag[];
  children?: React.ReactNode;
  formId?: string;
  onFormSubmit: (_argo0: Partial<FormData>) => void;
}

export const DriverForm = forwardRef<HTMLFormElement, Props>(
  ({ initialData, tagOptions, onFormSubmit, children, formId }, ref) => {
    const { data, handleChange } = useForm<FormData>(initialData ?? {});

    const onSubmit = useCallback(
      (e) => {
        e.preventDefault();
        onFormSubmit(data);
      },
      [onFormSubmit, data]
    );

    return (
      <Form id={formId} onSubmit={onSubmit} ref={ref}>
        <Stack direction="row">
          <FormControl w="70%">
            <FormLabel>Ім'я</FormLabel>
            <Input
              placeholder="Ваше ім'я?"
              w="full"
              value={data.fullName || ''}
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
        {children}
      </Form>
    );
  }
);
