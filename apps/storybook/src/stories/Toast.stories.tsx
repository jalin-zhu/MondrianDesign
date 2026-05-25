import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Toast } from 'mondrian-design';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

function ToastStoryDemo(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Show Toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Saved"
        description="Palette settings were updated."
        tone="blue"
      />
    </div>
  );
}

export const Playground: Story = {
  render: () => <ToastStoryDemo />,
};
