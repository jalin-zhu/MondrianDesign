import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Modal } from 'mondrian-design';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalStoryDemo(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Mondrian Modal">
        Geometric dialog content.
      </Modal>
    </div>
  );
}

export const Playground: Story = {
  render: () => <ModalStoryDemo />,
};
