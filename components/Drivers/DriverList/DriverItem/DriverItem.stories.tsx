import React from 'react';

import type { Story } from '@storybook/react';

import { DriverItem, Props } from './DriverItem';

export default {
  title: 'Driver/Driver List Item',
  component: DriverItem,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<Props> = (args) => <DriverItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  firstName: 'Виталий',
  lastName: ' Волочай',
  experience: '4',
  tags: [
    { label: 'Міжміські перевезення', value: '1' },
    { label: 'Таксі', value: '2' },
    { label: 'Вантажі', value: '3' },
    { label: 'Доставка', value: '4' },
  ],
};