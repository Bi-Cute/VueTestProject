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
    }
  ]
})

export default router
