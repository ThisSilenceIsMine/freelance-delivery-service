import { List } from '@chakra-ui/react';
import { STATUS } from '@lib/orderStatus';
import { Order } from '@lib/types';
import { OrderItem } from './OrderItem/OrderItem';

export interface Props {
  orders: Order[];
  onItemClick?: (id: number | string, status: string) => void;
}

export const OrderList = ({ orders, onItemClick }: Props) => {
  return (
    <List w="full">
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          btnTitle={order.status === 'APPOINTED' ? 'Почати виконання...' : 'Виконано'}
          onClick={
            (onItemClick && order.status !== 'DONE' && order.status !== 'BLOCKED')
              ? (oid) => onItemClick(oid, order?.status ?? '')
              : undefined
          }
          {...order}
        />
      ))}
    </List>
  );
};
