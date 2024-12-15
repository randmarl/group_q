<template>
    <div id="home">
        
        <div class="content">
            <PostObject v-for="post in posts" :key="post.id" :post="post" @update-likes="updateLikes"/>
            <button class="reset-button" v-on:click="resetLikes"> Reset Likes </button>
        </div>
        
    </div>
</template>

<script>

import PostObject from "../components/Post.vue";
import Data from '@/assets/posts.json';

export default {
    name: "HomeView",
    components: {
        PostObject,
    },
    data() {
        return {
            posts: [],
        };
    },
    methods: {
        async fetchPosts() {
            try {
                this.posts = (Data.record || Data).map(post => {
                    return {
                        ...post,
                        likes: post.likes || 0,
                    };
                });
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        },
        resetLikes() {
            this.posts.forEach((post) => {
                post.likes = 0;
            });
        },
        updateLikes(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                post.likes++;
            }
        }
    },
    mounted() {
        this.fetchPosts();
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
    height: auto;
  }
</style>