import {
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { QueryFunctionContext, useQuery, useQueryClient } from 'react-query';

import { api } from '@lib/Api/backend';
import { Order, Tag } from '@lib/types';
import { renameOrdersFrom } from '@lib/utils';
import { OrderList } from '~/components/Orders/OrderList';
import { OrdersFilter, FormData } from '~/components/Orders/OrdersFilter';

export interface Props {
  initialOrders: Order[];
  tags: Tag[];
  driverID: number;
  token: string;
}

export const DriverOrders = ({ initialOrders, tags, driverID, token }: Props) => {
  const [filter, setFilter] = useState<Partial<FormData>>();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data, refetch } = useQuery(['driverOrders', driverID, filter], fetchDriverOrders, {
    initialData: initialOrders,
  });

  useEffect(() => {
    refetch();
  }, [filter]);

  const onItemClick = async (id: number | string, status: string) => {
    console.log(status);
    if (status === 'APPOINTED') {
      try {
        await executeOrder(id, token);
        toast({
          title: 'Ви почали виконувати замовлення',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        queryClient.invalidateQueries();
      } catch (error) {
        toast({
          title: 'Помилка!',
          description: 'Щось пішло не так',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else if (status === 'IN_PROCESS') {
      try {
        await finishOrder(id, token);
        toast({
          title: 'Замовлення виконано',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        queryClient.invalidateQueries();
      } catch (error) {
        toast({
          title: 'Помилка!',
          description: 'Щось пішло не так',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

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
      <OrderList onItemClick={onItemClick} orders={data ?? []} />
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

async function executeOrder(id: number | string, token: string) {
  try {
    const { data } = await api.get('/user/driver/executing', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        advertisement_id: id,
      },
    });
    return !!data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function finishOrder(id: number | string, token: string) {
  try {
    const { data } = await api.get('/user/driver/done', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        advertisement_id: id,
      },
    });
    return !!data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
