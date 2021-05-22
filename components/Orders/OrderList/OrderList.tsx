import { List } from '@chakra-ui/react';
import { Order } from '@lib/types';
import { OrderItem } from './OrderItem/OrderItem';

export interface Props {
  orders: Order[];
}

export const OrderList = ({ orders }: Props) => {
  return (
    <List w="full">
      {orders.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </List>
  );
};
