import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/home/Home.vue'
const Register = () => import('../views/user/register.vue')

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/reg',
    name: 'register',
    component: Register
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
