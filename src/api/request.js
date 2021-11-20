import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    // 如果有接口需要请求认证，在这统一设置
    // 直接放行
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
    console.log(err)
  })
  return instance(config)
}
