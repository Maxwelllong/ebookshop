import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/home/Home.vue'
const Register = () => import('../views/user/register.vue')
const Search = () => import('../views/profile/search.vue')
const Address = () => import('../views/profile/Address.vue')

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/reg',
    name: 'register',
    component: Register
  }, {
    path: '/search',
    name: "search",
    component: Search
  }, {
    path: '/address',
    name: 'Address',
    component: Address
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
