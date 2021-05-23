import { Divider } from '@chakra-ui/react';
import { Order, Tag } from '@lib/types';
import { OrderList } from '~/components/Orders/OrderList'
import { OrdersFilter, FormData } from '~/components/Orders/OrdersFilter';
export interface Props {
  orders: Order[];
  tags: Tag[];
  onFilterSubmit: (data: Partial<FormData>) => void;
}

export const UserOrders = ({ orders, tags, onFilterSubmit }: Props) => {
  return (
    <>
      <OrdersFilter tagOptions={tags} fullWidth={true} onFilterSubmit={onFilterSubmit} />
      <Divider />
      <OrderList orders={orders} />
    </>
  );
};
