import React from 'react';

import type { Story } from '@storybook/react';

import { OrderItem, Props } from './OrderItem';

export default {
  title: 'Order/Order Item',
  component: OrderItem,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<Props> = (args) => <OrderItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 1,
  title: 'Перевездти холодильник з Бердичева в Житомир',
  departure: 'Бердичів',
  destination: 'Житомир',
  tags: [
    { label: 'Міжміські перевезення', value: '1' },
    { label: 'Таксі', value: '2' },
    { label: 'Вантажі', value: '3' },
    { label: 'Доставка', value: '4' },
  ],
  onClick: undefined
};

export const WithButton = Template.bind({});

WithButton.args = {
  id: 1,
  title: 'Перевездти холодильник з Бердичева в Житомир',
  departure: 'Бердичів',
  destination: 'Житомир',
  tags: [
    { label: 'Міжміські перевезення', value: '1' },
    { label: 'Таксі', value: '2' },
    { label: 'Вантажі', value: '3' },
    { label: 'Доставка', value: '4' },
  ],
  onClick: (id) => console.log(id)
};

