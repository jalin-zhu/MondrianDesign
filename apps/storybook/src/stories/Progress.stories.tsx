import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from 'mondrian-design';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  args: {
    value: 64,
    max: 100,
    tone: 'blue',
    showValue: true,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    max: 100,
    tone: 'yellow',
  },
};

