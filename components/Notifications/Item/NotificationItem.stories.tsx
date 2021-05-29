import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, NotificationItem } from './NotificationItem';

export default {
  title: 'Notification/NotificationItem',
  component: NotificationItem,
};

const Template: Story<Props> = (args) => <NotificationItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 1,
  title: "Новый водитель найден!",
  text: "Проверьте сови заказы. Новый водитель откликнулся на один из них!"
}


export const WithLongText = Template.bind({});
WithLongText.storyName = "With long text"
WithLongText.args = {
  id: 1,
  title: 'Новый водитель найден! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at sapien ornare, lobortis risus in, tincidunt lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin non massa varius, ornare ante quis, porttitor nisl. Nulla mi ipsum, pellentesque vitae nibh eget, hendrerit consequat nibh. Vivamus mattis leo in erat viverra, sed laoreet libero ullamcorper. Nullam feugiat felis ipsum, condimentum ornare dolor lobortis in. Maecenas efficitur tellus eu varius interdum. Suspendisse non molestie eros. Aliquam a pharetra leo, id laoreet lorem. Morbi magna augue, facilisis tincidunt varius id, porttitor eu nibh. In et sollicitudin lacus. Phasellus imperdiet arcu sed sem pulvinar euismod ut scelerisque mauris. ',
};