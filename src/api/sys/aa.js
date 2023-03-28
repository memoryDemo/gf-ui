import request from '@/utils/request'
// 查询参数列表
export function listSysAa(data) {
  return request({
    url: '/sys/aa/getList',
    method: 'post',
    data: data
  })
}
// 查询参数详细
export function getSysAa(query) {
  return request({
    url: '/sys/aa/getOne',
    method: 'get',
    params:query
  })
}
// 新增参数配置
export function addSysAa(data) {
  return request({
    url: '/sys/aa/create',
    method: 'post',
    data: data
  })
}
// 修改参数配置
export function updateSysAa(data) {
  return request({
    url: '/sys/aa/update',
    method: 'post',
    data: data
  })
}
// 删除参数配置
export function delSysAa(data) {
  return request({
    url: '/sys/aa/delete',
    method: 'post',
    data:data
  })
}