import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch } from 'mondrian-design';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Uncontrolled: Story = {
  args: {
    label: 'Enable contrast mode',
    defaultChecked: true,
    tone: 'blue',
  },
};

function ControlledSwitchDemo(): React.JSX.Element {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label={checked ? 'On' : 'Off'}
      checked={checked}
      onCheckedChange={setChecked}
      tone={checked ? 'red' : 'yellow'}
    />
  );
}

export const Controlled: Story = {
  render: () => <ControlledSwitchDemo />,
};

