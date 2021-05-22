import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, UserOrders } from './UserOrders';

export default {
  title: 'Profile/UserOrders',
  component: UserOrders,
};

const Template: Story<Props> = (args) => <UserOrders {...args} />;

export const Default = Template.bind({});
