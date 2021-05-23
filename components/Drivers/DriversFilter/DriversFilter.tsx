import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import {
  Input,
  VStack,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { TagPicker } from '~/components/TagPicker';
import { Form } from '~/components/StyledForm';
import type { Tag, Driver } from '~/lib/types';

import { useForm } from '~/hooks/useForm';

type FormData = Driver;
export interface Props {
  tagOptions: Tag[];
  onFilterSubmit: (data: Partial<FormData>) => void;
}

export const DriversFilter = ({ tagOptions, onFilterSubmit }: Props) => {
  const { data: filter, handleChange } = useForm<FormData>({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onFilterSubmit(filter);
    },
    [filter, onFilterSubmit]
  );

  return (
    <Form onSubmit={onSubmit} sticky>
      <FlexBox
        spacing="1.5"
        boxShadow="lg"
        justify="space-evenly"
        width={['full', 'full', 'full', 'md']}
        height="md"
        p="3.5"
      >
        <FormControl>
          <FormLabel>Ім'я водія</FormLabel>
          <Input
            value={filter.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Ім'я водія"
          />
        </FormControl>
        <FormControl>
          {/* <FormLabel>Виберіть теги</FormLabel> */}
          <TagPicker tags={tagOptions} onTagsPicked={(tags) => handleChange('tags', tags)} />
        </FormControl>
        <FormControl>
          <FormLabel>Виберіть стаж</FormLabel>
          <NumberInput
            mx="1.5"
            min={0}
            value={filter.experience}
            onChange={(value) => handleChange('experience', value)}
          >
            <NumberInputField placeholder="Стаж" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button type="submit">Пошук</Button>
      </FlexBox>
    </Form>
  );
};

const FlexBox = styled(VStack)`
  > div {
    width: 100%;
  }
`;

// export interface FormData {
//   fullName: string;
//   tags: Tag[];
//   experience: number;
// }

