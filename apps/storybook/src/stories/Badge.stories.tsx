import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from 'mondrian-design';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    children: 'NEW',
    tone: 'yellow',
  },
};

