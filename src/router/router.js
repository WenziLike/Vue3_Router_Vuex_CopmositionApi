import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import New from '@/views/New'
import Card from '@/views/Card'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', component: Home, alias: '/' },
    { path: '/new', component: New },
    { path: '/card', component: Card }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})