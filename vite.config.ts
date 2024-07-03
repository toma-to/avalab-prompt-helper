import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgLoader from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_DEVTOOLS__: true,
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
      },
    },
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'url',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'assets/icon/*',
          dest: 'assets/icon',
        },
      ],
    }),
    tsconfigPaths({ loose: true }),
  ],
});
