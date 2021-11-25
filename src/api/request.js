import axios from 'axios'
import {
  Toast
} from 'vant'
import router from '../router'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    // 如果有接口需要请求认证，在这统一设置
    // 直接放行
    const Token = window.sessionStorage.getItem('token')
    if (Token) {
      // 存在则将Token发送到服务器中
      config.headers.Authorization = 'Bearer ' + Token // Bearer 后面必须带空格
    }
    return config
  }, err => {
    console.log(err)
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res
  }, err => {
    // 如果有错误需要处理在这统一进行处理,根据状态码进行处理
    if (err.status === 422) {
      Toast('失败')
    } else if (err.status === 401) {
      // 没有登录 去登录
      router.push({
        path: '/login'
      })
    }
  })
  return instance(config)
}
