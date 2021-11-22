import {
  request
} from './request'

function getLeftMenu() {
  return request({
    url: '/api/goods'
  })
}

function getConData(order = 'sales', cid = 0, page = 1) {
  return request({
    url: '/api/goods?category_id=' + cid + '&page=' + page + '&' + order + '=1'
  })
}

export {
  getLeftMenu,
  getConData
}
