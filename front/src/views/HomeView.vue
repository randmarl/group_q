<template>
    <div id="home">
        <AppHeader />
        <div class="content">
            <PostObject v-for="post in posts" :key="post.id" :post="post" @update-likes="updateLikes"/>
            <button class="reset-button" v-on:click="resetLikes"> Reset Likes </button>
        </div>
        <AppFooter />
    </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";
import PostObject from "../components/Post.vue";
import Data from '@/assets/posts.json';

export default {
    name: "HomeView",
    components: {
        AppHeader,
        AppFooter,
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
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    margin-bottom: 40px;
}
.content {
    background-color: white;
	aspect-ratio: 3 / 4;
	overflow-y: auto;
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