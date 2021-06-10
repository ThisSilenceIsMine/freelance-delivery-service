import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link'
import { useCallback, FormEvent } from 'react';

import { useForm } from '~/hooks/useForm';

interface FormData {
  name: string;
  email: string;
}

export interface Props extends FormData {
  onFormSubmit: (_arg0: Partial<FormData>) => void;
}

export const UserProfile = ({ name, email, onFormSubmit }: Props) => {
  const { data, handleChange } = useForm<FormData>({ name, email });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onFormSubmit(data);
    },
    [onFormSubmit, data]
  );

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Нікнейм</FormLabel>
        <Editable
          boxShadow="base"
          p="2"
          defaultValue={name}
          value={data.name}
          onChange={(value) => handleChange('name', value)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Editable
          boxShadow="base"
          p="2"
          defaultValue={email}
          value={data.email}
          onChange={(value) => handleChange('email', value)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </FormControl>

      <Button colorScheme="teal" variant="outline" mt="2" type="submit">
        Зберегти
      </Button>
      <NextLink href="/api/auth/logout">
        <Button variant="outline"  mt="2" colorScheme="orange">
          Вихід
        </Button>
      </NextLink>
    </form>
  );
};
