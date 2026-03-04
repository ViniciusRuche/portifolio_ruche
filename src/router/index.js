import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/layouts/v2/AppLayout.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(authenticationGuard)
router.beforeEach(permissionGuard)
router.beforeEach(featureFlagGuard)
export default router
