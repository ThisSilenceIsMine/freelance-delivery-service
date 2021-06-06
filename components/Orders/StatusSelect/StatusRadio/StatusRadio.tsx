import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useRadio, RadioProps } from '@chakra-ui/radio';

export const StatusRadio: FC<RadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'orange.600',
          color: 'white',
          borderColor: 'orange.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={4}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};
