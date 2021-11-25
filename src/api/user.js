import {
  request
} from './request'
// 用户注册
function submitInfo(data) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data: data
  })
}
// 用户登录
function submitLogin(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}
// 用户退出
function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'POST'
  })
}
export {
  submitInfo,
  submitLogin,
  logout
}
