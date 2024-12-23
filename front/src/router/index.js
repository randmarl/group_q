import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from "@/views/SignupView.vue";
import ContactView from '@/views/ContactView.vue';
import AddPostView from '@/views/AddPostView.vue';
import Post from '@/components/Post.vue';

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView
    },
    { path: "/signup", name: "Signup", component: SignupView },
    {
        path: '/contact',
        name: 'ContactView',
        component: ContactView
    },
    { path: "/addPost", name: "AddPost", component: AddPostView },
    { path: "/post", name: "Post", component: Post },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
