import {
  request
} from './request'

// 添加地址
export function addAddress(params) {
  return request({
    url: '/api/address',
    method: 'POST',
    params
  })
}

// 编辑地址
export function editAddress(id, params) {
  return request({
    url: `/api/address/${id}`,
    method: 'PUT',
    params
  })
}

// 删除地址
export function deleteAddress(id) {
  return request({
    url: `/api/address/${id}`,
    method: 'DELETE'
  })
}

// 获取地址列表
export function getAddressList() {
  return request({
    url: '/api/address',
    method: 'GET'
  })
}
// 获取地址
export function getAddressDetail(id) {
  return request({
    url: `/api/address/${id}`,
    method: 'GET'
  })
}
