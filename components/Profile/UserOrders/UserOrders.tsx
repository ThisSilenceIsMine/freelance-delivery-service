import {
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { Order, Tag } from '@lib/types';
import { OrderList } from '~/components/Orders/OrderList';
import { OrdersFilter, FormData } from '~/components/Orders/OrdersFilter';
export interface Props {
  orders: Order[];
  tags: Tag[];
  onFilterSubmit: (data: Partial<FormData>) => void;
}

export const UserOrders = ({ orders, tags, onFilterSubmit }: Props) => {
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Фільтр Замовлень...
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <OrdersFilter tagOptions={tags} fullWidth={true} onFilterSubmit={onFilterSubmit} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Divider />
      <OrderList orders={orders} />
    </>
  );
};
