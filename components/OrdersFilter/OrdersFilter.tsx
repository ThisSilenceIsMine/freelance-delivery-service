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

import { TagPicker } from '../TagPicker';
import type { Tag } from '@lib/types';

const initialState: FormData = {
  title: '',
  tags: [],
  department: '',
  destination: '',
  minPrice: 0,
  maxPrice: 0,
};
export interface Props {
  tagOptions: Tag[];
  onFilterSubmit: (data: FormData) => void;
}

export const OrdersFilter = ({ tagOptions, onFilterSubmit }: Props) => {
  const [filter, setFilter] = useState<FormData>(initialState);

  const handleChange = useCallback(
    (field: keyof FormData, value: FormData[keyof FormData] ) => {

      setFilter((current) => {
        return { ...current, [field]: value };
      });
    },
    [setFilter]
  );

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const value = { ...filter };
    value.department = (filter.department as any).label
    value.destination = (filter.destination as any).label;

    onFilterSubmit(value);

  }, [filter, onFilterSubmit]);

  return (
    <Form onSubmit={onSubmit}>
      <FlexBox spacing="1.5" boxShadow="lg" width={["full","full","full", "md"]} height="lg" p="3.5">
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
            <NumberInput mx="1.5" precision={2}>
              <NumberInputField
                placeholder="До..."
                value={filter.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
              />
            </NumberInput>
          </Flex>
        </FormControl>
        <Button type="submit">Пошук</Button>
      </FlexBox>
    </Form>
  );
};

const FlexBox = styled(VStack)`
  > * {
    width: 100%;
  }
`;

const Form = styled.form`
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  @media only screen and (max-width: 62em) {
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
