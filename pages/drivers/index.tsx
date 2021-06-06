import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Stack, Button } from '@chakra-ui/react';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

import { renameDriversFrom, renameTagsFrom } from '@lib/utils';
import { Driver, Tag } from '@lib/types';
import { api } from '@lib/Api/backend';
import { DriversFilter, DriverList } from '@components/Drivers';

const fetchDrivers = async ({ pageParam = 0, queryKey }: QueryFunctionContext) => {
  const [_key, filter] = queryKey as [string, Partial<Driver> | null];

  const { data } = await api.get('/public/drivers', {
    params: {
      pageNumber: pageParam,
      name: filter?.fullName,
      types: filter?.tags && [...filter.tags.map((tag) => tag.label)].join('+'),
      min_experience: filter?.experience,
      max_experience: filter?.experience,
    },
  });

  return data;
};


interface Props {
  drivers: any;
  tags: Tag[];
}

export default function Drivers({drivers, tags}: Props) {
    const [filter, setFilter] = useState<Partial<Driver> | null>(null);
    const [driverList, setDriverList] = useState<Driver[]>();

    const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery(['drivers', filter], fetchDrivers, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.pageable.pageNumber < lastPage.totalPages)
          return lastPage.pageable.pageNumber + 1;
      },
      initialData: drivers,
    });

    useEffect(() => {
      console.log(data);
      if (!data) {
        return;
      }
      const list = data.pages.reduce(
        (drivers, page) => drivers.concat(renameDriversFrom(page.content)),
        []
      );
      console.log(list);

      setDriverList(list);
    }, [data]);
  return (
    <Container maxW="container.xl">
      <Stack
        direction={['column', 'column', 'column', 'row']}
        my="2.5"
        align="flex-start"
        spacing={['4', '4', '2.5', '2.5']}
      >
        <DriversFilter
          tagOptions={tags}
          onFilterSubmit={(val) => {
            setFilter(val);
          }}
        />
        <Stack direction="column" w="full">
          <DriverList drivers={driverList ?? []} />
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
  const { data: drivers } = await api.get('/public/drivers');
  const { data: _tags } = await api.get('/public/types');

  const tags = renameTagsFrom(_tags);

  // const orders = renameOrdersFrom(data.content);
  console.log(drivers)
  const initialPage = {
    pageParams: [0],
    pages: [drivers],
  };

  return {
    props: {
      orders: initialPage,
      tags,
    },
  };
};
