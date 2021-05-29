import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, NotificationsMenu } from './NotificationsMenu';
import { notifications } from '~/mock/Notifications.mock';

export default {
  title: 'Notification/Notifications Menu',
  component: NotificationsMenu,
};

const Template: Story<Props> = (args) => <NotificationsMenu {...args} />;

export const Default = Template.bind({});

Default.args = {
  notifications
}