import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, OrderForm } from './OrderForm';
import { tags } from '~/mock/tags.mock';

export default {
  title: 'Order/OrderForm',
  component: OrderForm,
};

const Template: Story<Props> = (args) => <OrderForm {...args} />;

export const Default = Template.bind({});

Default.args = {
  departure: "DEPATURE",
  destination: "DEST",
  tags,
  onFormSubmit: console.log,
  onModeChange: () => { }
}