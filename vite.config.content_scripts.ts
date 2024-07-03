import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig((opt) => {
  return {
    root: 'src',
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          content_scripts: resolve(__dirname, 'src/content_scripts/index.ts'),
        },
        output: {
          entryFileNames: '[name]/index.js',
        },
      },
    },
    plugins: [tsconfigPaths()],
  };
});
