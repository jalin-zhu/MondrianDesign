import type { Meta, StoryObj } from '@storybook/react';
import { Card } from 'mondrian-design';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {
    title: 'Primary Grid',
    subtitle: 'Structured composition',
    children: 'A card block for focused content.',
    tone: 'blue',
  },
};

