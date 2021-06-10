import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Text,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient, useQuery, QueryFunctionContext } from 'react-query';
import { getSession, getAccessToken } from '@auth0/nextjs-auth0';

import { UserProfile, UserOrders, DriverForm } from '@components/Profile';
import { RegisterDriverModal } from '@components/Profile/RegisterDriverModal/RegisterDriverModal';
import { api } from '@lib/Api/backend';
import type { User } from '@lib/Api/UserType';
import type { Driver, Tag } from '@lib/types';
import { renameOrdersFrom, renameTagsFrom, renameTagsTo } from '@lib/utils';
import { DriverOrders } from '@components/Profile/DriverOrders/DriverOrders';

interface Props {
  userID: string;
  token: string;
  user: User;
  tags: Tag[];
}

export default function Profile({ userID, token, user, tags }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const ref = useRef<HTMLFormElement>(null);
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data } = useQuery<User>(['profile', { token }], fetchUser, {
    initialData: user,
  });

  const { mutate: mutateDriver } = useMutation(updateDriver, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
      toast({
        title: 'Успішно!',
        description: 'Ваш профіль було оновлено',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Помилка!',
        description: 'Щось пішло не так. Перевірте вхідні дані.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

    const { mutate: mutateUser } = useMutation(updateUser, {
      onSuccess: () => {
        queryClient.invalidateQueries('profile');
        toast({
          title: 'Успішно!',
          description: 'Ваш профіль було оновлено',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Помилка!',
          description: 'Щось пішло не так. Перевірте вхідні дані.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
    });

  const isDriver = Boolean(data?.user_metadata.driver);

  const handleTabsChange = (index: number) => {
    if (!isDriver) {
      return;
    }
    setTabIndex(index);
  };

  return (
    <Container maxW="container.xl">
      <Tabs isFitted isLazy mt="8" index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Профіль</Tab>
          {/* <Tab isDisabled={isDriver}>Водій</Tab> */}
          <RegisterDriverModal isDriver={isDriver} tags={tags} token={token} />
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserProfile name={data?.name ?? ''} email={data?.email ?? ''} onFormSubmit={(user) => mutateUser({token, user})} />
            <Center my="3.5">
              <Heading>Ваші замовлення</Heading>
            </Center>
            <UserOrders
              initialOrders={renameOrdersFrom(data?.user_metadata?.advertisements ?? [])}
              tags={tags}
              userID={userID}
            />
          </TabPanel>
          <TabPanel>
            {isDriver && (
              <>
              <DriverForm
                initialData={{
                  id: data!.user_metadata.driver.id,
                  fullName: data!.user_metadata.driver.name,
                  experience: String(data!.user_metadata.driver.experience),
                  tags: (renameTagsFrom(data!.user_metadata.driver.types) as unknown) as Tag[],
                  description: data!.user_metadata.driver.description,
                }}
                tagOptions={tags}
                onFormSubmit={(driver) => { mutateDriver( {token, driver} ) }} //mutate driver
                ref={ref}
              >
                <Button colorScheme="teal" mt="2" variant="outline" type="submit">
                  Зберегти
                </Button>
              </DriverForm>
                <DriverOrders
                  token={token}
                  initialOrders={renameOrdersFrom(data!.user_metadata.driver.advertisements ?? [])}
                  tags={(renameTagsFrom(data!.user_metadata.driver.types) as unknown) as Tag[]}
                  driverID={data!.user_metadata.driver.id}
              />
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile', 'email'],
    });
  
    const session = getSession(req, res);


    const { data: user } = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data: _tags } = await api.get('/public/types');
    const tags = renameTagsFrom(_tags);
    const sub = session?.user?.sub as string;
    return {
      props: {
        user,
        tags,
        token: accessToken,
        userID: sub,
      },
    };
  } catch (error) {
    // console.log(error)
    console.log('Whoops! Token f*d up!');
    return { props: {} };
  }
};

async function updateUser({ token, user }: { token: string; user: { name?: string; email?: string; } }) {
  return (
    await api.patch(
      '/user',
      {
        name: user?.name,
        email: user?.email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).data;
}

async function updateDriver({ token, driver }: {token: string, driver: Partial<Driver>}) {

  return (
    await api.patch(
      '/user/driver',
      {
        experience: driver?.experience,
        description: driver?.description,
        name: driver?.fullName,
        types: driver.tags && renameTagsTo(driver.tags),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).data;
}

async function fetchUser({ queryKey }: QueryFunctionContext) {
  const [_key, { token }] = queryKey as [string, { token: string }];
  return (
    await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
}
