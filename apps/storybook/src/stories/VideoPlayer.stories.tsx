import type { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from 'mondrian-design';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

export const Playground: Story = {
  args: {
    title: 'Launch Clip',
    subtitle: 'Sample MP4 stream',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    preload: 'metadata',
    tone: 'white',
  },
};

