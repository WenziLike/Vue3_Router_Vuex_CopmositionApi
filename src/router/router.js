import { createRouter, createWebHistory } from 'vue-router'
import New from '@/views/New'
import Tasks from '@/views/Tasks'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/tasks', component: Tasks, alias: '/' },
        { path: '/new', component: New }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})