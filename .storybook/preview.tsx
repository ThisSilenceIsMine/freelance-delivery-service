import type { Story } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../lib/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: Story) => (
    <ThemeProvider theme={theme.LIGHT}>
      <Story />
    </ThemeProvider>
  ),
];
