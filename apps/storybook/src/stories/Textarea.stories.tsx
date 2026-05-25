import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from 'mondrian-design';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {
  args: {
    placeholder: 'Describe your layout idea...',
    tone: 'white',
    rows: 5,
  },
};

export const Error: Story = {
  args: {
    value: 'Missing required details.',
    error: true,
    'aria-invalid': true,
  },
};

