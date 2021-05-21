import React from 'react';

import type { Story } from '@storybook/react';

import { OrdersFilter, Props } from './OrdersFilter';
import { tags } from '~/mock/tags.mock';

export default {
  title: 'Order/Orders Filter',
  component: OrdersFilter,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<Props> = (args) => <OrdersFilter {...args} />;

export const Default = Template.bind({});

Default.args = {
  tagOptions: tags,
  onFilterSubmit: (data) => console.log(data),
};
