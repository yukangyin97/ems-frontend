import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    path: '/employeeDetail',
    name: 'EmployeeDetail',
    component: () => import('@/components/AddEmployee')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
