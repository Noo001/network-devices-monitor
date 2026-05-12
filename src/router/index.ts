import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'devices',
            component: () => import('../views/DevicesView.vue'),
        },
    ],
})

export default router
