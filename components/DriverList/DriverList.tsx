import { List } from '@chakra-ui/react';
import { Driver } from '@lib/types';
import { DriverItem } from './DriverItem/DriverItem';

export interface Props {
  drivers: Driver[];
}

export const DriverList = ({ drivers }: Props) => {
  return (
    <List w="full">
      {drivers.map((driver) => (
        <DriverItem {...driver} />
      ))}
    </List>
  );
};
