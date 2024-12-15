<template>
    <div id="home">
        
        <div class="content">
            <PostObject v-for="post in posts" :key="post.id" :post="post" @update-likes="updateLikes"/>
            <div class="buttons">
              <button class="reset-button" v-on:click="resetLikes"> Reset Likes </button>
              <button class="addPost-button" v-on:click="addPost"> Add Post </button>
              <button class="delete-button" v-on:click="deleteAll"> Delete All </button>
            </div>
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
    ...mapState({
      posts: state => state.posts
    }),
  },
  methods: {
    ...mapActions({
      incrementLikes: 'incrementLikes',
      resetLikes: 'resetLikes',
    }),

    updateLikes(postId) {
      this.incrementLikes(postId);
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

.addPost-button {
  margin: 20px 0;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.addPost-button:hover {
  background-color: #36a372;
}

.delete-button {
  margin: 20px 0;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #36a372;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>