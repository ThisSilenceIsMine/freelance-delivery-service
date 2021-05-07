import React from 'react';

import type { Story } from '@storybook/react';

import { Header } from './Header';

export default {
  title: 'Header',
  component: Header,
//   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story = (args) => <Header {...args}/>;

export const Default = Template.bind({});