import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from 'mondrian-design';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: {
    name: 'Mondrian Grid',
    tone: 'yellow',
    size: 44,
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    alt: 'Demo user',
    size: 48,
  },
};

