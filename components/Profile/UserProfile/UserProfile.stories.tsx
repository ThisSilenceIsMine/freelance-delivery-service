import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, UserProfile } from './UserProfile';

export default {
  title: 'Profile/UserProfile',
  component: UserProfile,
};

const Template: Story<Props> = (args) => <UserProfile {...args} />;

export const Default = Template.bind({});

Default.args = {
  email: 'myemail@gmail.com',
  name: 'Виталий Волочай',
  onFormSubmit: (data) => console.log(data),
};
