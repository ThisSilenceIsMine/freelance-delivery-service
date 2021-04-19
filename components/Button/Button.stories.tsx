import React from 'react';

import {Story} from "@storybook/react"

import { Button, Props } from './Button';



export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
};

type StoryProps = Props & { label: string };

const Template: Story<StoryProps> = (args) => <Button {...args}> {args.label}  </Button>;

export const Default = Template.bind({});
Default.args = {
  label: 'Click me!',
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Click me!',
  primary: true,
};

// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
