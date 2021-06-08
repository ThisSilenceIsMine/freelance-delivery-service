import {
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { api } from '@lib/Api/backend';
import { Order, Tag } from '@lib/types';
import { renameOrdersFrom } from '@lib/utils';
import { OrderList } from '~/components/Orders/OrderList';
import { OrdersFilter, FormData } from '~/components/Orders/OrdersFilter';

export interface Props {
  initialOrders: Order[];
  tags: Tag[];
  driverID: number;
}

export const DriverOrders = ({ initialOrders, tags, driverID }: Props) => {
  const [filter, setFilter] = useState<Partial<FormData>>();

  const { data, refetch } = useQuery(['driverOrders', driverID, filter], fetchDriverOrders, {
    initialData: initialOrders,
  });

  useEffect(() => {
    refetch();
  }, [filter]);

  useEffect(() => {
    console.log('initialOrders :>> ', initialOrders);
    console.log('data :>> ', data);
  }, [data]);

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
      <OrderList orders={data ?? []} />
    </>
  );
};

async function fetchDriverOrders({ queryKey }: QueryFunctionContext) {
  const [_key, driverID, filter] = queryKey as [string, number, Partial<FormData> | null];

  const { data } = await api.get('/public/advertisements', {
    params: {
      driver_id: driverID,
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
