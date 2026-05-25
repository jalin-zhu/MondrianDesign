import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Button } from 'mondrian-design';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    title: 'Token update available',
    description: 'A new color preset is ready to apply.',
    tone: 'yellow',
  },
};

export const WithAction: Story = {
  render: () => (
    <Alert
      title="Publishing blocked"
      description="NPM_TOKEN is missing in repository secrets."
      tone="red"
      action={<Button tone="black">Open Settings</Button>}
    />
  ),
};

