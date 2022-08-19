import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Test from '../views/TestFile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Test

    },
    {
      path: '/about',
      name: 'about',
    }
  ]
})

export default router
