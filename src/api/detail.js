import {
  request
} from './request'

function getDetail(id) {
  return request({
    url: '/api/goods/' + id
  })
}

export {
  getDetail
}
