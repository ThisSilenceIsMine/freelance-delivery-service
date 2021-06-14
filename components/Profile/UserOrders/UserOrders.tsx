import {
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { api } from '@lib/Api/backend';
import { Order, Tag } from '@lib/types';
import { renameOrdersFrom } from '@lib/utils';
import { useEffect, useState } from 'react';
import { useQueryClient, QueryFunctionContext, useQuery } from 'react-query';
import { OrderList } from '~/components/Orders/OrderList';
import { OrdersFilter, FormData } from '~/components/Orders/OrdersFilter';
export interface Props {
  initialOrders: Order[];
  tags: Tag[];
  userID: string;
}


export const UserOrders = ({ initialOrders, tags, userID }: Props) => {
  const [filter, setFilter] = useState<Partial<FormData>>();

  const { data, refetch } = useQuery(['userOrders', userID, filter], fetchUserOrders, {
    initialData: initialOrders,
  });

  useEffect(() => {
    refetch();
  }, [filter]);

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
            <OrdersFilter
              withOrderStatus
              tagOptions={tags}
              fullWidth={true}
              onFilterSubmit={(f) => setFilter(f)}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Divider />
      <OrderList withStatus orders={data ?? []} />
    </>
  );
};

async function fetchUserOrders({ queryKey }: QueryFunctionContext) {
    const [_key, userID, filter] = queryKey as [string, string, Partial<FormData> | null];

    const { data } = await api.get('/public/advertisements', {
      params: {
        user_id: userID,
        title: filter?.title,
        types: filter?.tags && [...filter.tags.map((tag) => tag.label)].join('+'),
        deliver_from: filter?.department,
        deliver_to: filter?.destination,
        max_price: filter?.maxPrice,
        min_price: filter?.minPrice,
        status: filter?.status,
      },
    });

  const rn = renameOrdersFrom(data.content);
  
  return rn;
}