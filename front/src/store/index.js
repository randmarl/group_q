import { createStore } from 'vuex';
import postData from '@/assets/posts.json';
import axios from 'axios';

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('vuex-posts', JSON.stringify(state.posts));
  localStorage.setItem('vuex-user', JSON.stringify(state.user));
};

const loadStateFromLocalStorage = () => {
  const savedPosts = localStorage.getItem('vuex-posts');
  const savedUser = localStorage.getItem('vuex-user');
  return {
    posts: savedPosts
      ? JSON.parse(savedPosts).map(post => ({
          ...post,
          likes: post.likes || 0,
        }))
      : postData.record.map(post => ({
          ...post,
          likes: post.likes || 0,
        })),
    user: savedUser ? JSON.parse(savedUser) : null,
  };
};

const store = createStore({
  state: {
    ...loadStateFromLocalStorage(),
  },
  mutations: {
    INCREMENT_LIKES(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes++;
        saveStateToLocalStorage(state);
      }
    },
    RESET_LIKES(state) {
      state.posts.forEach(post => {
        post.likes = 0;
      });
      saveStateToLocalStorage(state);
    },
    SET_USER(state, user) {
      state.user = user;
      saveStateToLocalStorage(state);
    },
    LOGOUT_USER(state) {
      state.user = null;
      saveStateToLocalStorage(state);
    },
  },
  actions: {
    incrementLikes({ commit }, postId) {
      commit('INCREMENT_LIKES', postId);
    },
    resetLikes({ commit }) {
      commit('RESET_LIKES');
    },
    async loginUser({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', credentials);
        commit('SET_USER', response.data.user_id);
        return true; // Login successful
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        return false; // Login failed
      }
    },
    logoutUser({ commit }) {
      commit('LOGOUT_USER');
    },
  },
  getters: {
    allPosts: state => state.posts,
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
  },
});

export default store;
