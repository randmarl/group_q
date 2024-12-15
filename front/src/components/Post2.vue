<template>
  <div class="post">
    <div class="post-header">
      <p>{{ post.date }}</p>
    </div>
    <div class="post-content" @dblclick="toggleEditMode">
      <p v-if="!isEditing">{{ post.content }}</p>
      <input 
        v-if="isEditing" 
        v-model="newContent" 
        type="text" 
        placeholder="Edit your post"
      />
    </div>
    <div class="post-footer">
      <button class="like-button" @click="incrementLikes">
        👍 <span class="like-count">{{ post.likes }}</span>
      </button>
    </div>
    <div class="buttons" v-if="showButtons">
      <button @click="handleUpdatePost" class="updatePost">Update</button>
      <button @click="deletePost" class="deletePost">Delete</button>
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
  data() {
    return {
      showButtons: false,
      isEditing: false,
      newContent: this.post.content,
    };
  },
  methods: {
    ...mapActions({
      incrementLikes: 'incrementLikes',
      updatePost: 'updatePost',
    }),

    incrementLikes() {
      this.$emit('update-likes', this.post.id);
    },
    toggleEditMode() {
      this.isEditing = !this.isEditing;
      this.showButtons = !this.showButtons;
      if (this.isEditing) {
        this.newContent = this.post.content;
      }
    },
    async handleUpdatePost() {
      try {
        const updatedPost = {
          ...this.post,
          content: this.newContent,
          date_updated: new Date().toISOString(),
        };

        await this.updatePost(updatedPost);
        this.isEditing = false;
        this.showButtons = false;
      } catch (error) {
        console.error('Error updating post:', error);
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
  .deletePost {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 45%;
    margin-top: 10px;
    text-align: center;
  }
  .deletePost:hover {
    background-color: #0056b3;
  }
  .updatePost {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 45%;
    margin-top: 10px;
    text-align: center;
  }
  
  
  .updatePost:hover {
    background-color: #0056b3;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  </style>
  