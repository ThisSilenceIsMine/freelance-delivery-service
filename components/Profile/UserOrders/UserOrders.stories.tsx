import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, UserOrders } from './UserOrders';
import { orders } from '~/mock/orders.mock';
import { tags } from '~/mock/tags.mock';

export default {
  title: 'Profile/UserOrders',
  component: UserOrders,
};

const Template: Story<Props> = (args) => <UserOrders {...args} />;

export const Default = Template.bind({});

Default.args = {
  onFilterSubmit: (data) => console.log(data),
  orders,
  tags
}