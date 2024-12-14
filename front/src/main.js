import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const app = createApp(App);
app.use(store).use(router);
app.config.globalProperties.$axios = axios;
app.mount('#app');
