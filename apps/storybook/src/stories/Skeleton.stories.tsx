import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from 'mondrian-design';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Lines: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 320 }}>
      <Skeleton height={18} />
      <Skeleton height={18} width="82%" />
      <Skeleton height={18} width="66%" />
    </div>
  ),
};

export const Circle: Story = {
  args: {
    width: 56,
    height: 56,
    circle: true,
  },
};

