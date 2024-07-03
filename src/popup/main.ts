import { createApp } from 'vue';
import '@css/style.scss';
import './popup.scss';
import App from './App.vue';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

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
