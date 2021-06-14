import { List } from '@chakra-ui/react';
import { Order } from '@lib/types';
import { OrderItem } from './OrderItem/OrderItem';

export interface Props {
  orders: Order[];
  withStatus?: boolean;
  onItemClick?: (id: number | string, status: string) => void;
}

export const OrderList = ({ orders, onItemClick, withStatus }: Props) => {
  return (
    <List w="full">
      {orders.map((order) => (
        <OrderItem
          withStatus={withStatus}
          key={order.id}
          btnTitle={order.status === 'APPOINTED' ? 'Почати виконання...' : 'Виконати'}
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
