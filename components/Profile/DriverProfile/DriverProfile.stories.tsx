import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, DriverProfile } from './DriverProfile';

export default {
  title: 'Profile/DriverProfile',
  component: DriverProfile,
};

const Template: Story<Props> = (args) => <DriverProfile {...args} />;

export const Default = Template.bind({});