import type { Meta, StoryObj } from '@storybook/react';
import { Input } from 'mondrian-design';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  args: {
    placeholder: 'Type here',
    tone: 'yellow',
  },
};

export const Error: Story = {
  args: {
    value: 'Invalid value',
    error: true,
    'aria-invalid': true,
  },
};

