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
          service_worker: resolve(__dirname, 'src/service_worker/index.ts'),
        },
        output: {
          entryFileNames: '[name]/index.js',
        },
      },
    },
    plugins: [tsconfigPaths()],
  };
});
