import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from "@/views/SignupView.vue";
import ContactView from '@/views/ContactView.vue';

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
