import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from 'mondrian-design';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  args: {
    items: [
      { key: 'overview', label: 'Overview', content: 'Overview content block' },
      { key: 'tokens', label: 'Tokens', content: 'Token content block' },
      { key: 'a11y', label: 'A11y', content: 'Accessibility block' },
    ],
  },
};

