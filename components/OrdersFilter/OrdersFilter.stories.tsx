import React from 'react';

import type { Story } from '@storybook/react';

import { OrdersFilter, Props } from './OrdersFilter';

export default {
  title: 'Orders Filter',
  component: OrdersFilter,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<Props> = (args) => <OrdersFilter {...args} />;

export const Default = Template.bind({});

Default.args = {
  tagOptions: [
    { label: 'Міжміські перевезення', value: '' },
    { label: 'Таксі', value: '' },
    { label: 'Вантажі', value: '' },
    { label: 'Доставка', value: '' },
  ],
};
