import { Container, Tabs, TabList, TabPanels, Tab, TabPanel, Center, Text } from '@chakra-ui/react';

import { UserProfile, DriverProfile, UserOrders } from '@components/Profile';

import { tags, orders, drivers } from '../../mock';

const __mockUserProfile = {
  name: 'Vitaliy',
  email: 'vitaliy@mail.com',
  phoneNumber: '+380984686733',
  onFormSubmit: console.log,
};

const __mockDriverProfile = {
  initialData: drivers[0],
  tagOptions: tags,
  onFormSubmit: console.log,
};

const __mockUserOrders = {
  orders,
  tags,
  onFilterSubmit: console.log,
};

export default function Orders() {
  return (
    <Container maxW="container.xl">
      <Tabs isFitted isLazy>
        <TabList>
          <Tab>Профіль</Tab>
          <Tab>Водій</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserProfile {...__mockUserProfile} />
            <Center my="3.5">
              <Text>Ваші замовлення</Text>
            </Center>
            <UserOrders {...__mockUserOrders} />
          </TabPanel>
          <TabPanel>
            <DriverProfile {...__mockDriverProfile} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
