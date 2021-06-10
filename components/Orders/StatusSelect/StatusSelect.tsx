import {HStack} from '@chakra-ui/react'
import { useRadioGroup } from '@chakra-ui/radio';

import {StatusRadio} from './StatusRadio/StatusRadio'
import { statusValue, names } from '@lib/orderStatus';

export interface Props {
  onSelected: (_arg0: string) => void;
}

export const StatusSelect = ({ onSelected }: Props) => {
  const options = names;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'status',
    defaultValue: options[0],
    onChange: (name: string) => onSelected(statusValue[name]),
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <StatusRadio key={value} {...radio}>
            {value}
          </StatusRadio>
        );
      })}
    </HStack>
  );
};
