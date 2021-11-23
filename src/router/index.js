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
const Detail = () => import('../views/detail/Detail.vue')
const Login = () => import('../views/user/login.vue')

const routes = [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'Home',
    component: Home,
    meta: {
      isShow: true // 需要显示 底部导航
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: menuItem,
    meta: {
      isShow: true
    }
  }, {
    path: '/cart',
    name: 'shopCart',
    component: shopCart,
    meat: {
      isShow: true
    }
  }, {
    path: '/user',
    name: 'userInfo',
    component: userInfo,
    meta: {
      isShow: true
    }
  },
  {
    path: '/reg',
    name: 'register',
    component: Register,
    meta: {
      isShow: false
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isShow: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      isShow: false
    }
  }, {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      isShow: false
    }
  }, {
    path: '/detail',
    name: 'goodsDetail',
    component: Detail,
    meta: {
      isShow: false
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
