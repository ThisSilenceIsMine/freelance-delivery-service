import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, StatusSelect } from './StatusSelect';

export default {
  title: 'StatusSelect',
  component: StatusSelect,
};

const Template: Story<Props> = (args) => <StatusSelect {...args} />;

export const Default = Template.bind({});

Default.args = {
  onSelected: console.log
}