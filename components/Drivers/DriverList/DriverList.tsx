import { List } from '@chakra-ui/react';
import { Driver } from '@lib/types';
import { DriverItem } from './DriverItem/DriverItem';

export interface Props {
  drivers: Driver[];
  onClick?: (id: number | string) => void;
}

export const DriverList = ({ drivers, onClick }: Props) => {
  return (
    <List w="full">
      {drivers.map((driver) => (
        <DriverItem onClick={onClick} key={driver.id} {...driver} />
      ))}
    </List>
  );
};
