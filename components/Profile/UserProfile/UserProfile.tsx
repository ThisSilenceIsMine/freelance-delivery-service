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
  onDataChanged: (_arg0: Partial<FormData>) => void;
}

export const UserProfile = ({ name, email, phoneNumber, onDataChanged }: Props) => {
  const { data, handleChange } = useForm<FormData>({});

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onDataChanged(data);
    },
    [onDataChanged, data]
  );

  return (
    <form {...onSubmit}>
      <FormControl>
        <FormLabel>Ім'я</FormLabel>
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
        <Editable boxShadow="base" p="2" defaultValue={email}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </FormControl>
      <FormControl>
        <FormLabel>Номер телефону</FormLabel>
        <Editable boxShadow="base" p="2" defaultValue={phoneNumber}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </FormControl>
      <Button type="submit">Зберегти</Button>
    </form>
  );
};
