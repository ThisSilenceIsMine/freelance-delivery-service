import {HStack} from '@chakra-ui/react'
import { useRadioGroup } from '@chakra-ui/radio';

import {StatusRadio} from './StatusRadio/StatusRadio'

// //TODO: assign string values
// export enum OrderStatus {
//   DONE,
//   IN_PROCESS,
//   ACTIVE,
//   BLOCKED,
// }


export interface Props {
  onSelected: (_arg0: string) => void;
}

export const StatusSelect = ({ onSelected }: Props) => {
  const options = ["Виконано", "В Процессі"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'status',
    defaultValue: options[0],
    onChange: onSelected
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
