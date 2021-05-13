import React from 'react';

import type { Story } from '@storybook/react';

import { OrderItem, Props as OrderProps } from './OrderItem';

export default {
  title: 'Order Item',
  component: OrderItem,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<OrderProps> = (args) => <OrderItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  header: 'Sample text',
  destination: 'Бердичев',
  departure: 'Гуйва',
  tags: ['Перевезення людей', 'Межгородские'],
};
