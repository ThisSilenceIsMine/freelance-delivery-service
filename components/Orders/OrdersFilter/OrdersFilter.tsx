import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import {
  Input,
  Text,
  VStack,
  Flex,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import PlacesAutocomplete from 'react-google-places-autocomplete';

import { useForm } from '~/hooks/useForm';

import { TagPicker } from '~/components/TagPicker';
import { Form } from '~/components/StyledForm';
import type { Tag } from '@lib/types';

export interface Props {
  tagOptions: Tag[];
  onFilterSubmit: (data: Partial<FormData>) => void;
  sticky?: boolean;
  fullWidth?: boolean;
}

export const OrdersFilter = ({ tagOptions, onFilterSubmit, sticky, fullWidth }: Props) => {
  const { data: filter, handleChange } = useForm<FormData>({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const value = { ...filter };
      if (filter.department) {
        value.department = (filter.department as any).label;
      }
      if (filter.destination) {
        value.destination = (filter.destination as any).label;
      }

      onFilterSubmit(value);
    },
    [filter, onFilterSubmit]
  );

  return (
    <Form {...{ sticky, fullWidth }} onSubmit={onSubmit}>
      <FlexBox
        spacing="1.5"
        boxShadow="lg"
        width={['full', 'full', 'full', `${fullWidth ? 'full' : 'md'}`]}
        height="lg"
        p="3.5"
      >
        <FormControl>
          <FormLabel>Виберіть заголовок</FormLabel>
          <Input
            value={filter.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Заголовок оголошення"
          />
        </FormControl>
        <FormControl>
          {/* <FormLabel>Виберіть теги</FormLabel> */}
          <TagPicker tags={tagOptions} onTagsPicked={(tags) => handleChange('tags', tags)} />
        </FormControl>
        <FormControl>
          <FormLabel>Виберіть місце відправки</FormLabel>
          <PlacesAutocomplete
            selectProps={{
              value: filter.department,
              onChange: (value: any) => handleChange('department', value),
              placeholder: 'Почніть друкувати...',
            }}
            onLoadFailed={(error) => console.error('Could not inject Google script', error)}
            apiOptions={{ language: 'uk', region: 'ua' }}
            apiKey={process.env.NEXT_PUBLIC_GMAP_API_KEY}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Виберіть місце Призначення</FormLabel>
          <PlacesAutocomplete
            selectProps={{
              value: filter.destination,
              onChange: (value: string) => handleChange('destination', value),
              placeholder: 'Почніть друкувати...',
            }}
            onLoadFailed={(error) => console.error('Could not inject Google script', error)}
            apiOptions={{ language: 'uk', region: 'ua' }}
            apiKey={process.env.NEXT_PUBLIC_GMAP_API_KEY}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Діапазон бюджету</FormLabel>
          <Flex direction="row" align="center" justify="center">
            <NumberInput mx="1.5" precision={2}>
              <NumberInputField
                value={filter.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                placeholder="Від..."
              />
            </NumberInput>
            <Text>{' — '}</Text>
            <NumberInput
              mx="1.5"
              precision={2}
              value={filter.maxPrice}
              onChange={(value) => handleChange('maxPrice', value)}
            >
              <NumberInputField placeholder="До..." />
            </NumberInput>
          </Flex>
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

export interface FormData {
  title: string;
  tags: Tag[];
  department: string;
  destination: string;
  minPrice: number;
  maxPrice: number;
}
