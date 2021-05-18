import React from 'react';

import type { Story } from '@storybook/react';

import { OrderItem } from './OrderItem';

export default {
  title: 'OrderItem',
  component: OrderItem,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story = (args) => <OrderItem {...args} />;

export const Default = Template.bind({});
