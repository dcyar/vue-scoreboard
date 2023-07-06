import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/user';

const routes = [
    {
        path: '/',
        component: () => import('./pages/Scoreboard.vue')
    },
    {
        path: '/login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/controls',
        component: () => import('./pages/Controls.vue'),
        meta: {
            requiresAuth: true,
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    const store = useUserStore();
    if (to.meta.requiresAuth && ! store.isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;