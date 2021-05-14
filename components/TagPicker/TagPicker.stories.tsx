import React from 'react';

import type { Story } from '@storybook/react';

import { TagPicker, Props } from './TagPicker';

export default {
  title: 'Tag Picker',
  component: TagPicker,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<Props> = (args) => <TagPicker {...args} />;

export const Default = Template.bind({});

Default.args = {
  tags: [
    { label: 'Міжміські перевезення', value: '1' },
    { label: 'Таксі', value: '2' },
    { label: 'Вантажі', value: '3' },
    { label: 'Доставка', value: '4' },
  ],
};