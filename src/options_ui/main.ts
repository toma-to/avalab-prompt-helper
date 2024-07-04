import { createApp } from 'vue';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import '@css/style.scss';
import App from './App.vue';
import './options.scss';

const app = createApp(App);
app.use(FloatingVue, {
  themes: {
    'info-tooltip': {
      distance: 24,
      delay: { show: 1000, hide: 0 },
    },
  },
});
app.mount('#app');
