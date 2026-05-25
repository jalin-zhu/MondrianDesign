import type { Meta, StoryObj } from '@storybook/react';
import { Select } from 'mondrian-design';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  render: () => (
    <Select defaultValue="red">
      <option value="red">Red</option>
      <option value="yellow">Yellow</option>
      <option value="blue">Blue</option>
    </Select>
  ),
};

