import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'mondrian-design';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: 'Mondrian Button',
    variant: 'primary',
    tone: 'red',
    size: 'md',
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button tone="red">Default</Button>
      <Button tone="yellow" variant="outlined">
        Outlined
      </Button>
      <Button tone="blue" disabled>
        Disabled
      </Button>
    </div>
  ),
};

