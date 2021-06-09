import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, RegisterDriverModal } from './RegisterDriverModal';
import { tags } from '~/mock/tags.mock';

export default {
  title: 'RegisterDriverModal',
  component: RegisterDriverModal,
};

const Template: Story<Props> = (args) => <RegisterDriverModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  token: "token_there",
  tags,
};
