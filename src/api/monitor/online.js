import request from '@/utils/request'

// 查询在线用户列表
export function list(query) {
  return request({
    url: '/monitor/online/getList',
    method: 'post',
    data: query
  })
}

// 强退用户
export function forceLogout(Ids) {
  return request({
    url: '/monitor/online/delete',
    method: 'post',
    data:{'ids':Ids}
  })
}
