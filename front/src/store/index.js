import { createStore } from 'vuex';
import axios from 'axios';

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('vuex-user', JSON.stringify(state.user));
};

const loadStateFromLocalStorage = () => {
  const savedUser = localStorage.getItem('vuex-user');
  return {
    posts: [],
    user: savedUser ? JSON.parse(savedUser) : null,
  };
};

const store = createStore({
  state: {
    ...loadStateFromLocalStorage(),
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    INCREMENT_LIKES(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes++;
      }
    },
    RESET_LIKES(state) {
      state.posts.forEach(post => {
        post.likes = 0;
      });
    },
    SET_USER(state, user) {
      state.user = user;
      saveStateToLocalStorage(state);
    },
    LOGOUT_USER(state) {
      state.user = null;
      saveStateToLocalStorage(state);
    },
    UPDATE_POST(state, updatedPost) {
      const postIndex = state.posts.findIndex(post => post.id === updatedPost.id);
      if (postIndex !== -1) {
        state.posts.splice(postIndex, 1, updatedPost);
      }
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/posts', { withCredentials: true });
        const posts = response.data.map(post => ({
          id: post.id,
          content: post.body,
          likes: post.like_count,
          date: post.date_posted,
        }));
        commit('SET_POSTS', posts);
      } catch (error) {
        console.error('Error fetching posts:', error.response?.data || error.message);
      }
    },
    incrementLikes({ commit }, postId) {
      commit('INCREMENT_LIKES', postId);
      axios.put(`http://localhost:3000/posts/${postId}`, { like_count: 1 }, { withCredentials: true }).catch(err => {
        console.error('Error updating likes on server:', err.response?.data || err.message);
      });
    },
    resetLikes({ commit }) {
      commit('RESET_LIKES');

    },
    async loginUser({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', credentials, { withCredentials: true });
        commit('SET_USER', response.data.user_id);
        return true;
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        return false;
      }
    },
    logoutUser({ commit }) {
      axios.get('http://localhost:3000/auth/logout', { withCredentials: true }).catch(err => {
        console.error('Logout error:', err.response?.data || err.message);
      });
      commit('LOGOUT_USER');
    },
    async updatePost({ commit }, updatedPost) {
      try {
        
        await axios.put(`http://localhost:3000/posts/${updatedPost.id}`, {
          body: updatedPost.content,
          date_updated: updatedPost.date_updated,
        }, { withCredentials: true });

        
        commit('UPDATE_POST', updatedPost);
      } catch (error) {
        console.error('Error updating post:', error.response?.data || error.message);
      }
    },
  },
  getters: {
    allPosts: state => state.posts,
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
  },
});

export default store;
