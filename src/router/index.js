import {
  Notify
} from 'vant'
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
    meta: {
      title: '购物车',
      isShow: true,
      isAuthRequired: true // 授权才能访问
    }
  }, {
    path: '/user',
    name: 'userInfo',
    component: userInfo,
    meta: {
      title: '用户详情',
      isShow: true,
      isAuthRequired: true // 授权才能访问
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

router.beforeEach((to, from, next) => {
  // 判断原元素中的isAuthRequired 和 user下面的isLogin状态是否为false
  const isToken = !!window.sessionStorage.getItem('token')
  console.log(isToken)
  if (to.path !== '/cart') {
    next()
  } else {
    if (!isToken && !to.meta.isAuthRequired) {
      Notify('您还没有登录，请登录后重试！')
      return next('/login')
    } else {
      return next()
    }
  }
})

export default {
  ...router
}
