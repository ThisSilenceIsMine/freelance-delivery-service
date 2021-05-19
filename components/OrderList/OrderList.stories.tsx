import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { OrderList, Props } from './OrderList';

import {OrderItem} from './OrderItem/OrderItem'
import { orders } from 'mock';

export default {
  title: 'Order/Order List',
  component: OrderList,
  subcomponents: {OrderItem}
} as Meta;

const Template: Story<Props> = (args) => <OrderList {...args} />;

export const Default = Template.bind({});

Default.args = {
  orders
};
