<template>
    <div id="home">
        
        <div class="content">
            <PostObject v-for="post in posts" :key="post.id" :post="post" @update-likes="updateLikes"/>
            <button class="reset-button" v-on:click="resetLikes"> Reset Likes </button>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostObject from "../components/Post.vue";

export default {
  name: "HomeView",
  components: {
    PostObject,
  },
  computed: {
    // Use Vuex getter to get the posts
    ...mapState({
      posts: state => state.posts
    }),
  },
  methods: {
    // Use Vuex actions to handle likes
    ...mapActions({
      incrementLikes: 'incrementLikes',
      resetLikes: 'resetLikes',
    }),

    // This method will be called when a like button is clicked
    updateLikes(postId) {
      this.incrementLikes(postId); // Call Vuex action to increment likes
    }
  },
};
</script>

<style>
  #home {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
  }

  .content {
    background-color: white;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    overflow-y: auto;
    padding: 20px;
    flex: 1;
  }

  .reset-button {
    margin: 20px 0;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: center;
  }

  .reset-button:hover {
    background-color: #36a372;
  }

  .side-panel {
    flex: 1;
    background-color: rgb(209, 209, 209);
}

.reset-button {
  margin: 20px 0;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #36a372;
}
</style>