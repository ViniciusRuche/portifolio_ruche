import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router' // This import should point to your routes file declared above

export default createRouter({
  history: createWebHistory(),
  routes: routes
})
