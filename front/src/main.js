import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

async function checkAuthentication() {
    try {
      const response = await axios.get('/auth/authenticate');
      if (response.data.authenticated) {
        store.commit('setUser', { authenticated: true });
      } else {
        store.commit('setUser', { authenticated: false });
      }
    } catch (error) {
      console.error('Authentication check failed:', error.message);
      store.commit('setUser', { authenticated: false });
    }
  }

const app = createApp(App);
store.dispatch('fetchPosts');
checkAuthentication().then(() => {
    app.use(store).use(router);
    app.config.globalProperties.$axios = axios;
    app.mount('#app');
  });