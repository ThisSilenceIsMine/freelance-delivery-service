import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, ProfileTabs } from './ProfileTabs';

export default {
  title: 'ProfileTabs',
  component: ProfileTabs,
};

const Template: Story<Props> = (args) => <ProfileTabs {...args} />;

export const Default = Template.bind({});