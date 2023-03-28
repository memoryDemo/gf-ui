import request from '@/utils/request'

// 查询部门列表
export function listDept(data) {
  return request({
    url: '/system/dept/getList',
    method: 'post',
    data: data
  })
}

// 查询部门列表（排除节点）111111111111111111111111111111
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: '/system/dept/getOne',
    method: 'post',
    data:{"deptId":deptId}
  })
}

// 查询部门下拉树结构
export function treeselect() {
  return request({
    url: '/system/dept/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询部门树结构1111111111111111111111111111111111111
export function roleDeptTreeselect(roleId) {
  return request({
    url: '/system/dept/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/system/dept/create',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/system/dept/update',
    method: 'post',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: '/system/dept/delete',
    method: 'post',
    data:{"deptIdList":deptId}
  })
}