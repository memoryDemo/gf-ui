import request from '@/utils/request'

// 获取当前数据库所有表名
export function genTableList(query) {
  return request({
    url: '/tool/gen/getTables',
    method: 'get'
  })
}
// 获取当前表所有字段
export function getColumnList(query) {
  return request({
    url: '/tool/gen/getColumn',
    method: 'get',
    params: query
  })
}

// 预览生成代码
export function previewTable(data) {
  return request({
    url: '/tool/gen/preview',
    method: 'post',
    data: data
  })
}


// 查询表详细信息
export function getGenTable(tableId) {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'get'
  })
}

// 修改代码生成信息
export function updateGenTable(data) {
  return request({
    url: '/tool/gen',
    method: 'put',
    data: data
  })
}

// 导入表
export function importTable(data) {
  return request({
    url: '/tool/gen/importTable',
    method: 'post',
    params: data
  })
}



// 删除表数据
export function delTable(tableId) {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'delete'
  })
}

// 生成代码（自定义路径）
export function genCode(tableName) {
  return request({
    url: '/tool/gen/genCode/' + tableName,
    method: 'get'
  })
}

// 同步数据库
export function synchDb(tableName) {
  return request({
    url: '/tool/gen/synchDb/' + tableName,
    method: 'get'
  })
}
