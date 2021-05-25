import * as React from 'react';

import type { Story } from '@storybook/react';

import { Props, DriverForm } from './DriverForm';
import { tags } from '~/mock/tags.mock';
import { Button } from '@chakra-ui/react';

export default {
  title: 'Profile/Driver Form',
  component: DriverForm,
};

const Template: Story<Props> = (args) => (
  <DriverForm {...args}>
    <Button colorScheme="teal" mt="2" variant="outline" type="submit">
      Зберегти
    </Button>
  </DriverForm>
);

export const Default = Template.bind({});
Default.args = {
  tagOptions: tags,
  onFormSubmit: (data) => console.log(data),
};

export const PreFilled = Template.bind({});

PreFilled.args = {
  tagOptions: tags,
  initialData: {
    fullName: 'Виталий Волочай',
    experience: '5',
    id: 3,
    tags,
    description: 'Average Fumo enjoyer.',
  },

  onFormSubmit: (data) => console.log(data),
};
