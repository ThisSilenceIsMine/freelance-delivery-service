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
  order: orders[0]
}

export const WithDate = Template.bind({});

WithDate.args = {
  order: {...orders[0], date: new Date(), }
};

export const WithPrice = Template.bind({});

WithPrice.args = {
  order: {...orders[0], price: 250}
};

export const DateAndPrice = Template.bind({});

DateAndPrice.args = {
  order: { ...orders[0], price: 250, date: new Date()}
};