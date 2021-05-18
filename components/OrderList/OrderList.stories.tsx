import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { OrderList, Props } from './OrderList';

import {OrderItem} from './OrderItem/OrderItem'

export default {
  title: 'Order List',
  component: OrderList,
  subcomponents: {OrderItem}
} as Meta;

const Template: Story<Props> = (args) => <OrderList {...args} />;

export const Default = Template.bind({});

Default.args = {
  orders: [
    {
      title: 'Перевездти холодильник з Бердичева в Житомир',
      departure: 'Бердичів',
      destination: 'Житомир',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
    {
      title: 'Перевездти холодильник з Бердичева в Житомир',
      departure: 'Бердичів',
      destination: 'Житомир',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
    {
      title: 'Перевездти холодильник з Бердичева в Житомир',
      departure: 'Бердичів',
      destination: 'Житомир',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
    {
      title: 'Перевездти холодильник з Бердичева в Житомир',
      departure: 'Бердичів',
      destination: 'Житомир',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
    {
      title: 'Перевездти холодильник з Бердичева в Житомир',
      departure: 'Бердичів',
      destination: 'Житомир',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
  ],
};
