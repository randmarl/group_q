<template>
    <div class="aPost-page">
      <div class="aPost-container">
        <h2 class="welcome-message">A Post</h2>
        <form @submit.prevent="changePosts">
          <input
            id="post"
            v-model="postContent"
            placeholder="Write your post..."
            required
          />
          <p class="error-message" v-if="validationMessage">{{ validationMessage }}</p>
          <button class="action-btn" type="submit">Update</button>
          <button class="action-btn" type="submit">Delete</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>  
  export default {
    name: "APostView",
    
  };
  </script>
  
  <style scoped>
  .aPost-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f9f9f9;
  }
  
  .aPost-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    text-align: center;
  }
  
  .welcome-message {
    margin-bottom: 20px;
  }
  
  input {
    display: block;
    width: calc(100% - 40px);
    margin: 10px auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .action-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    text-align: center;
  }
  
  .signup-link {
    background: none;
    color: #007bff;
    border: none;
    text-decoration: underline;
    cursor: pointer;
  }
  
  .action-btn:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  
  .toggle-message {
    margin-top: 10px;
    font-size: 0.9rem;
  }
  
  .toggle-link {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
  }
  </style>
  