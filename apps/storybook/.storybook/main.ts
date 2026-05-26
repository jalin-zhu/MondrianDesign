import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = [
      {
        find: 'mondrian-design/styles.css',
        replacement: path.resolve(__dirname, '../../../packages/mondrian-design/src/styles.css'),
      },
      {
        find: /^mondrian-design$/,
        replacement: path.resolve(__dirname, '../../../packages/mondrian-design/src/index.ts'),
      },
      ...(Array.isArray(viteConfig.resolve.alias) ? viteConfig.resolve.alias : []),
    ];
    return viteConfig;
  },
};

export default config;
