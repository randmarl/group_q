<template>
    <div class="post">
      <div class="post-header">
        <a class="post-logo" href="#">
          <img :src="profileImage" width="50" height="50" alt="User pfp" />
          <p>{{ post.author }}</p>
        </a>
        <p>{{ post.date }}</p>
      </div>
      <div class="post-content">
        <img v-if="post.image" class="post-photo" :src="resolveImage(post.image)" alt="Post image" />
        <p>{{ post.content }}</p>
      </div>
      <div class="post-footer">
        <button class="like-button" @click="incrementLikes">
          👍 <span class="like-count">{{ post.likes }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import userProfileImage from '@/assets/pfp.jpg';
  import { mapActions } from 'vuex';
  
  export default {
    name: "PostObject",
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        profileImage: userProfileImage,
      };
    },
    methods: {
      ...mapActions({
        incrementLikes: 'incrementLikes',
      }),
      incrementLikes() {
        this.$emit('update-likes', this.post.id);
    },
      resolveImage(imagePath) {
        if (!imagePath || typeof imagePath !== 'string') return '';
        try {
          return require(`@/assets/${imagePath.split('/').pop()}`);
        } catch (error) {
          console.error('Error loading image: ', error);
          return '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .post {
    background-color: rgb(209, 209, 209);
    border-radius: 10px;
    margin: 10px;
    max-width: 600px;
    width: 100%;
    padding: 10px;
  }
  
  .post-logo {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    text-decoration: none;
    color: black;
    margin: 5px;
  }
  
  .post-header {
    flex-direction: row;
    justify-content: space-between;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin: 10px;
  }
  
  .post-footer {
    justify-content: left;
  }
  
  .post-content {
    justify-content: center;
    margin: 10px;
  }
  
  .post-photo {
    width: 100%;
    border-radius: 10px;
  }
  
  .like-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .like-button:hover {
    color: #42b983;
  }
  
  .like-count {
    font-weight: bold;
  }
  </style>
  