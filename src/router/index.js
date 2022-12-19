import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test1',
      name: 'test1',
      component: () => import('../views/Test1View.vue')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('../views/Test2View.vue')
    },
    {
      path: '/test3',
      name: 'test3',
      component: () => import('../views/Test3View.vue')
    },
    {
      path: '/test4',
      name: 'test4',
      component: () => import('../views/Test4View.vue')
    },
    {
      path: '/test5',
      name: 'test5',
      component: () => import('../views/Test5View.vue')
    },
  ]
})

export default router
