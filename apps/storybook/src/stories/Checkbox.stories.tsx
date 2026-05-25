import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from 'mondrian-design';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {
    label: 'Enable strong grid lines',
  },
};

