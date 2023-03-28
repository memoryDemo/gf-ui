import request from '@/utils/request'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/monitor/operLog/getList',
    method: 'post',
    data: query
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/monitor/operLog/delete',
    method: 'post',
    data:{'operIdList':operId}
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operLog/clean',
    method: 'get'
  })
}
