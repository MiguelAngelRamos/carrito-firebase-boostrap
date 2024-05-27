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
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path:'/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'admin-productos',
          name: 'admin-productos',
          component: () => import ('../views/admin/AdminView.vue')
        },
        {
          path: 'nuevo',
          name: 'nuevo-producto',
          component: () => import('../views/admin/NewProductView.vue')
        }
      ]
    }
  ]
})

export default router
