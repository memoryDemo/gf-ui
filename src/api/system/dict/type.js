import request from '@/utils/request'

// 查询字典类型列表
export function listType(data) {
  return request({
    url: '/system/dictType/getList',
    method: 'post',
    data: data
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: '/system/dictType/getOne',
    method: 'post',
    data: {"dictId":dictId}
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/system/dictType/create',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/system/dictType/update',
    method: 'post',
    data: data
  })
}

// 删除字典类型
export function delType(dictId) {
  return request({
    url: '/system/dictType/delete',
    method: 'post',
    data: {"dictIdList":dictId}
  })
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: '/system/dict/type/refreshCache',
    method: 'delete'
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get'
  })
}
