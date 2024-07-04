import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgLoader from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_DEVTOOLS__: true,
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        options: resolve(__dirname, 'options.html'),
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
