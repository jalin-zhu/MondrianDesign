import { defineConfig } from 'tsup';

export default defineConfig([
  // React 组件包
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    splitting: false,
    sourcemap: true,
    external: ['react', 'react-dom'],
  },
  // Web Components 包（无 React 依赖）
  {
    entry: ['src/web-components/index.ts'],
    format: ['esm', 'iife'],
    dts: false,
    clean: false,
    splitting: false,
    sourcemap: true,
    outDir: 'dist',
    outExtension: ({ format }) => ({
      js: format === 'iife' ? '.web-components.global.js' : '.web-components.js',
    }),
    external: [],
    esbuildOptions(options) {
      if (options.format === 'iife') {
        options.globalName = 'MondrianDesign';
      }
    },
  },
]);
