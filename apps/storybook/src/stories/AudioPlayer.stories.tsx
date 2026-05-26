import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from 'mondrian-design';

const meta: Meta<typeof AudioPlayer> = {
  title: 'Components/AudioPlayer',
  component: AudioPlayer,
};

export default meta;
type Story = StoryObj<typeof AudioPlayer>;

export const Playground: Story = {
  args: {
    title: 'Ambient Track',
    subtitle: 'Sample audio stream',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    preload: 'none',
    tone: 'yellow',
  },
};

