import {
  request
} from './request'

function getIndexData() {
  return request({
    url: 'api/index'
  })
}

function getBanner() {

}
export {
  getIndexData,
  getBanner
}
