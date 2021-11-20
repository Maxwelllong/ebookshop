import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/home/Home.vue'
const Register = () => import('../views/user/register.vue')
const Search = () => import('../views/profile/search.vue')
const Address = () => import('../views/profile/Address.vue')
const menuItem = () => import('../views/menu/mainItem.vue')
const shopCart = () => import('../views/Cart/shopCart.vue')
const userInfo = () => import('../views/user/user.vue')

const routes = [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'Home',
    component: Home,
    children: [{
      path: '/menu',
      name: 'Menu',
      component: menuItem
    }, {
      path: '/cart',
      name: 'shopCart',
      component: shopCart
    }, {
      path: '/user',
      name: 'userInfo',
      component: userInfo
    }]
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
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
