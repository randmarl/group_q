import { createStore } from 'vuex';
import postData from '@/assets/posts.json';

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('vuex-posts', JSON.stringify(state.posts));
};

const loadStateFromLocalStorage = () => {
  const savedPosts = localStorage.getItem('vuex-posts');
  if (savedPosts) {
    try {
      const parsedPosts = JSON.parse(savedPosts);
      return parsedPosts.map(post => ({
        ...post,
        likes: post.likes || 0,
      }));
    } catch (e) {
      console.error('Error parsing posts from localStorage:', e);
      return postData.record.map(post => ({
        ...post,
        likes: post.likes || 0,
      }));
    }
  } else {
    return postData.record.map(post => ({
      ...post,
      likes: post.likes || 0,
    }));
  }
};

const store = createStore({
  state: {
    posts: loadStateFromLocalStorage(),
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
  },
  actions: {
    incrementLikes({ commit }, postId) {
      commit('INCREMENT_LIKES', postId);
    },
    resetLikes({ commit }) {
      commit('RESET_LIKES');
    },
  },
  getters: {
    allPosts: state => state.posts,
  },
});

export default store;
