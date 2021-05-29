import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, NotificationsList } from './NotificationsList';

export default {
  title: 'Notification/NotificationsList',
  component: NotificationsList,
};

const Template: Story<Props> = (args) => <NotificationsList {...args} />;

export const Default = Template.bind({});