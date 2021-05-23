import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, DriverProfile } from './DriverProfile';
import { tags } from '~/mock/tags.mock';

export default {
  title: 'Profile/DriverProfile',
  component: DriverProfile,
};

const Template: Story<Props> = (args) => <DriverProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  tagOptions: tags,
  onFormSubmit: (data) => console.log(data)
}

export const PreFilled = Template.bind({});

PreFilled.args = {
  tagOptions: tags,
  initialData: {
    fullName: "Виталий Волочай",
    experience: "5",
    id: 3,
    tags,
    description: "Average Fumo enjoyer."
  },

  onFormSubmit: (data) => console.log(data)
}