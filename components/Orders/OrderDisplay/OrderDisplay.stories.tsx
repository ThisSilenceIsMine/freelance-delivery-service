import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, OrderDisplay } from './OrderDisplay';
import { orders } from '~/mock/orders.mock';

export default {
  title: 'Order/OrderDisplay',
  component: OrderDisplay,
};

const Template: Story<Props> = (args) => <OrderDisplay {...args} />;

export const Default = Template.bind({});

Default.args = {
  ...orders[0],
}

export const WithDate = Template.bind({});

WithDate.args = {
  ...orders[0],
  date: new Date().toDateString(),
};

export const WithPrice = Template.bind({});

WithPrice.args = {
  ...orders[0], price: 250
};
