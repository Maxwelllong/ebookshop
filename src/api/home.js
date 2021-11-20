import {
  request
} from './request'

function getIndexData() {
  return request({
    url: 'api/index'
  })
}

function getGoods(type = 'sale', page = 1) {
  return request({
    url: "/api/index?" + type + "=1&page=" + page,
  })
}
export {
  getIndexData,
  getGoods
}
