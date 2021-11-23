import {
  request
} from './request'

function submitInfo(data) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data: data
  })
}

export {
  submitInfo
}
