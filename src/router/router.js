import { createRouter, createWebHistory } from 'vue-router'
import New from './../views/New'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/new', component: New, alias: '/' }
    ]
})