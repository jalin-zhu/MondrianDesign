import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  base: '/MondrianDesign/',
  resolve: {
    alias: [
      {
        find: 'mondrian-design/styles.css',
        replacement: path.resolve(__dirname, '../../packages/mondrian-design/src/styles.css'),
      },
      {
        find: /^mondrian-design$/,
        replacement: path.resolve(__dirname, '../../packages/mondrian-design/src/index.ts'),
      },
    ],
  },
});
