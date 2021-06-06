import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Heading, Flex, Stack, Button } from '@chakra-ui/react';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

import { OrderList, OrdersFilter, FormData } from '@components/Orders';
import { renameOrdersFrom, renameTagsFrom } from '@lib/utils';
import { Order, Tag } from '@lib/types';
import { api } from '@lib/Api/backend';
interface Props {
  orders: any;
  tags: Tag[];
}

const fetchOrders = async ({ pageParam = 0, queryKey }: QueryFunctionContext) => {

  const [_key, filter] = queryKey as [string, Partial<FormData> | null];

  const { data } = await api.get('/public/advertisements', {
    params: {
      pageNumber: pageParam,
      title: filter?.title,
      types: filter?.tags && [...(filter.tags.map(tag => tag.label))].join('+'),
      deliver_from: filter?.department,
      deliver_to: filter?.destination,
      max_price: filter?.maxPrice,
      min_price: filter?.minPrice,
    },
  });

  return data;
};

export default function Orders({ orders, tags }: Props) {
  const [filter, setFilter] = useState<Partial<FormData> | null>(null);
  const [orderList, setOrderList] = useState<Order[]>();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['orders', filter], fetchOrders, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.pageable.pageNumber < lastPage.totalPages)
        return lastPage.pageable.pageNumber + 1;
    },
    initialData: orders,
  });

  useEffect(() => {
    console.log(data);
    if (!data) {
      return;
    }
    const list = data.pages.reduce((orders, page) => orders.concat(renameOrdersFrom(page.content)), []);
    console.log(list);
    
    setOrderList(list);
  }, [data]);

  return (
    <Container maxW="container.xl">
      <Stack
        direction={['column', 'column', 'column', 'row']}
        my="2.5"
        align="flex-start"
        spacing={['4', '4', '2.5', '2.5']}
      >
        <OrdersFilter tagOptions={tags} onFilterSubmit={(data) => {setFilter(data);}} sticky />
        <Stack direction="column" w="full">
          <OrderList orders={orderList ?? []} />
          <Button
            isLoading={isFetching}
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage
              ? 'Завантажую...'
              : hasNextPage
              ? 'Завантажити більше'
              : 'Більше даних немає'}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: orders } = await api.get('/public/advertisements/');
  const { data: _tags } = await api.get('/public/types');

  const tags = renameTagsFrom(_tags);

  // const orders = renameOrdersFrom(data.content);

  const initialPage = {
    pageParams: [0],
    pages: [orders]
  }

  return {
    props: {
      orders: initialPage,
      tags,
    },
  };
};
