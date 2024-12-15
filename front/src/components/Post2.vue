<template>
    <div class="post">
      <div class="post-header">
        <p>{{ post.date }}</p>
      </div>
      <div class="post-content">
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
  import { mapActions } from 'vuex';
  
  export default {
    name: "PostObject",
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    methods: {
      ...mapActions({
        incrementLikes: 'incrementLikes',
      }),
      incrementLikes() {
        this.$emit('update-likes', this.post.id);
    },
    },
  };
  </script>
  
  <style scoped>
  .post {
    background-color: rgb(209, 209, 209);
    border-radius: 10px;
    margin: 10px;
    max-width: 550px;
    width: 100%;
    padding: 10px;
  }
  
  
  .post-header {
    justify-content: right;
    display: flex;
    align-items: right;
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
  