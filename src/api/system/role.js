import request from '@/utils/request'

// 查询角色列表
export function listRole(data) {
  return request({
    url: '/system/role/getList',
    method: 'post',
    data: data
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/system/role/getOne',
    method: 'post',
    data:{"roleId":roleId}
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/system/role/create',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/system/role/update',
    method: 'post',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/system/role/delete',
    method: 'post',
    data:{"roleIdList":roleId}
  })
}

// // 角色数据权限
// export function dataScope(data) {
//   return request({
//     url: '/system/role/dataScope',
//     method: 'put',
//     data: data
//   })
// }

// // 角色状态修改
// export function  (roleId, status) {
//   const data = {
//     roleId,
//     status
//   }
//   return request({
//     url: '/system/role/changeStatus',
//     method: 'put',
//     data: data
//   })
// }

// 查询角色已授权用户列表
export function allocatedUserList(data) {
  return request({
    url: '/system/role/allocatedList',
    method: 'post',
    data: data
  })
}

// 查询角色未授权用户列表
// export function unallocatedUserList(data) {
//   return request({
//     url: '/system/role/authUser/unallocatedList',
//     method: 'get',
//     data: data
//   })
// }

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/system/role/cancel',
    method: 'post',
    data: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: '/system/role/roleSelectUser',
    method: 'post',
    params: data
  })
}
