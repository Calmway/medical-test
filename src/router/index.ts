import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '',
        redirect: { name: 'home' },
        component: () => import('../App.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import("../components/Home.vue"),
                meta: {
                    title: 'Hemodialysis - Home'
                }
            },
            {
                path: '/session',
                name: 'session',
                component: () => import('../components/Session.vue'),
                meta: {
                    title: 'Hemodialysis - Session'
                }
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;