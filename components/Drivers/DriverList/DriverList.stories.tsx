import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { DriverList, Props } from './DriverList';

import { DriverItem } from './DriverItem/DriverItem';
import { drivers } from '~/mock/drivers.mock';

export default {
  title: 'Driver/Driver List',
  component: DriverList,
  subcomponents: { DriverItem },
} as Meta;

const Template: Story<Props> = (args) => <DriverList {...args} />;

export const Default = Template.bind({});

Default.args = {
  drivers
};
