import {
  request
} from './request'
// 提交订单
export function createOrder(params) {
  return request({
    url: '/api/orders',
    method: 'post',
    params
  })
}
// 获取订单预览
export function orderPreview() {
  return request({
    url: '/api/orders/preview',
    method: 'GET'
  })
}
// 获取订单详情
export function orderDetail(orderId) {
  return request({
    url: `/api/orders/${orderId}`,
    method: 'GET'
  })
}
// 获取订单列表
export function orderList() {
  return request({
    url: '/api/orders',
    method: 'GET'
  })
}
// 获取物流列表
export function expressList(order) {
  return request({
    url: `/api/orders/${order}/express`,
    method: 'GET'
  })
}

// 确认收货
export function confirmReceive(order) {
  return request({
    url: `/api/orders/${order}/confirm`,
    method: 'PATCH'
  })
}

// 评价商品
export function commitGoods(order) {
  return request({
    url: `/api/orders/${order}/comment`,
    method: 'POST'
  })
}
