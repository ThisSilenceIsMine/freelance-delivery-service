import { List } from '@chakra-ui/react';
import { Order } from '@lib/types';
import { OrderItem } from './OrderItem/OrderItem';

export interface Props {
  orders: Order[];
  onItemClick?: (id: number | string) => void;
}

export const OrderList = ({ orders, onItemClick }: Props) => {
  return (
    <List w="full">
      {orders.map((order) => (
        <OrderItem key={order.id} onClick={ onItemClick } {...order} />
      ))}
    </List>
  );
};
