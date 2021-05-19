import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { DriverList, Props } from './DriverList';

import { DriverItem } from './DriverItem/DriverItem';

export default {
  title: 'Driver/Driver List',
  component: DriverList,
  subcomponents: { DriverItem },
} as Meta;

const Template: Story<Props> = (args) => <DriverList {...args} />;

export const Default = Template.bind({});

Default.args = {
  drivers: [
    {
      firstName: 'Виталий',
      lastName: ' Волочай',
      experience: '4',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
    {
      firstName: 'Виталий',
      lastName: ' Волочай',
      experience: '4',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },

    {
      firstName: 'Виталий',
      lastName: ' Волочай',
      experience: '4',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
    {
      firstName: 'Виталий',
      lastName: ' Волочай',
      experience: '4',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
    {
      firstName: 'Виталий',
      lastName: ' Волочай',
      experience: '4',
      tags: [
        { label: 'Міжміські перевезення', value: '1' },
        { label: 'Таксі', value: '2' },
        { label: 'Вантажі', value: '3' },
        { label: 'Доставка', value: '4' },
      ],
    },
  ],
};
