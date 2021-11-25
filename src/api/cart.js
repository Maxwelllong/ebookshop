import {
  request
} from './request'

// 添加购物车
function addCart(data) {
  return request({
    url: '/api/carts',
    method: 'post',
    data
  })
}
// 修改购物车
function editCart(id, data) {
  return request({
    url: `/api/carts/${id}`,
    method: 'put',
    data
  })
}
// 购物车选择状态
function selectCart(data) {
  return request({
    url: '/api/carts/checked',
    method: 'patch',
    data
  })
}
// 获取全部商品列表
function getCart(data = '') {
  return request({
    url: '/api/carts?' + data,
    method: 'get'
  })
}
// 删除购物车
function deleteCart(id) {
  return request({
    url: `/api/carts/${id}`,
    method: 'delete'
  })
}

export {
  addCart,
  editCart,
  selectCart,
  getCart,
  deleteCart
}
