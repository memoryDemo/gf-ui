import request from '@/utils/request'

// 查询登录日志列表
export function list(query) {
  return request({
    url: '/monitor/loginLog/getList',
    method: 'post',
    data: query
  })
}

// 删除登录日志
export function delLogininfor(infoId) {
  return request({
    url: '/monitor/loginLog/delete',
    method: 'post',
    data: {"infoIdList":infoId}
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: '/monitor/loginLog/clean',
    method: 'get'
  })
}
