import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dragons'
  },
  {
    path: '/dragons',
    name: 'Dragons',
    component: () => import('../views/Dragons.vue')
  },
  {
    path: '/dragon-types',
    name: 'DragonTypes',
    component: () => import('../views/DragonTypes.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 