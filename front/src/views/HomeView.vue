<template>
    <div id="home">
        
        <div class="content">
            <PostObject v-for="post in posts" :key="post.id" :post="post" @update-likes="updateLikes"/>
            <template v-if="isAuthenticated">
              <div class="buttons">
              <button class="reset-button" v-on:click="resetLikes"> Reset Likes </button>
              <router-link 
                to="/addPost"
                class="addPost-button" 
                v-on:click="addPost" 
                :disabled="!isAuthenticated"
                :class="{ disabled: !isAuthenticated }"
              >
                Add Post
            </router-link>
              <button 
                class="delete-button" 
                v-on:click="deleteAll" 
                :disabled="!isAuthenticated"
                :class="{ disabled: !isAuthenticated }"
              >
                Delete All
              </button></div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PostObject from "../components/Post2.vue";

export default {
  name: "HomeView",
  components: {
    PostObject,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState({
      posts: state => state.posts,
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
    width: 100%;
    max-width: 600px;
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
  text-decoration: none;
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