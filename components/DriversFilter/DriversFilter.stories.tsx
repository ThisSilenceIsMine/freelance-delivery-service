import React from 'react';

import type { Story } from '@storybook/react';

import { DriversFilter, Props } from './DriversFilter';

export default {
  title: 'Driver/Drivers Filter',
  component: DriversFilter,
  //   argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<Props> = (args) => <DriversFilter {...args} />;

export const Default = Template.bind({});

Default.args = {
  tagOptions: [
    { label: 'Міжміські перевезення', value: '1' },
    { label: 'Таксі', value: '2' },
    { label: 'Вантажі', value: '3' },
    { label: 'Доставка', value: '4' },
  ],
  onFilterSubmit: (data) => console.log(data),
};
