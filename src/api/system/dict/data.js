import request from '@/utils/request'

// 查询字典数据列表
export function listData(data) {
  return request({
    url: '/system/dictData/getList',
    method: 'post',
    data: data
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/system/dictData/getOne',
    method: 'post',
    data:{"dictCode":dictCode}
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/system/dictData/type',
    method: 'get',
    params: {"dictType":dictType}
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/system/dictData/create',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/system/dictData/update',
    method: 'post',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: '/system/dictData/delete' + dictCode,
    method: 'data',
    data:{"dictCodeStr":dictCode}
  })
}
