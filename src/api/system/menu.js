import request from '@/utils/request'

// 查询菜单列表
export function listMenu(data) {
  return request({
    url: '/system/menu/getList',
    method: 'post',
    data: data
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: '/system/menu/getOne',
    method: 'post',
    data:{"menuId":menuId}
  })
}

// 查询菜单下拉树结构
export function treeselect(roleId) {
  return request({
    url: '/system/menu/treeselect',
    method: 'post',
    data:{'roleId':roleId}
  })
}

// // 根据角色ID查询菜单下拉树结构
// export function roleMenuTreeselect(roleId) {
//   return request({
//     url: '/system/menu/roleMenuTreeselect/' + roleId,
//     method: 'get'
//   })
// }

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/system/menu/create',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/system/menu/update',
    method: 'post',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: '/system/menu/delete',
    method: 'post',
    data:{"menuIdList":menuId}
  })
}