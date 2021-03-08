import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/views/Employees')
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/error-page/404')
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
