import request from '@/utils/request'

export function getWindDirection() {
  return request({
    url: '/vue-admin-template/wind/direction',
    method: 'get'
  })
}
