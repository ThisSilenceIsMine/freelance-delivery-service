import React from 'react';

import type { Story } from '@storybook/react';

import { DriversFilter, Props } from './DriversFilter';
import { tags } from '~/mock/tags.mock';

export default {
  title: 'Driver/Drivers Filter',
  component: DriversFilter,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<Props> = (args) => <DriversFilter {...args} />;

export const Default = Template.bind({});

Default.args = {
  tagOptions: tags,
  onFilterSubmit: (data) => console.log(data),
};
