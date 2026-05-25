import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from 'mondrian-design';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Radio name="palette" value="red" defaultChecked label="Red first" />
      <Radio name="palette" value="blue" label="Blue first" />
    </div>
  ),
};

