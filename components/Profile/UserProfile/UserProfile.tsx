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

import { useCallback, FormEvent } from 'react';

import { useForm } from '~/hooks/useForm';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Props extends FormData {
  onFormSubmit: (_arg0: Partial<FormData>) => void;
}

export const UserProfile = ({ name, email, phoneNumber, onFormSubmit }: Props) => {
  const { data, handleChange } = useForm<FormData>({name, email, phoneNumber});

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
      <FormControl>
        <FormLabel>Номер телефону</FormLabel>
        <Editable
          boxShadow="base"
          p="2"
          defaultValue={phoneNumber}
          value={data.phoneNumber}
          onChange={(value) => handleChange('phoneNumber', value)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </FormControl>
      <Button colorScheme="teal"  variant="outline" mt="2" type="submit">Зберегти</Button>
    </form>
  );
};
