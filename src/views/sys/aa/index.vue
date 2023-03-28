<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">      
      <el-form-item label="参数名称" prop="configName">
        <el-input
          v-model="queryParams.configName"
          placeholder="请输入参数名称"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>      
      <el-form-item label="参数键名" prop="configKey">
        <el-input
          v-model="queryParams.configKey"
          placeholder="请输入参数键名"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>      
      <el-form-item label="系统内置（Y是 N否）" prop="configType">
        <el-select v-model="queryParams.configType" placeholder="系统内置（Y是 N否）" clearable>
          <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['sys/aa/create']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sys/aa/update']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['sys/aa/delete']"
        >删除</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <!-- 表格展示 -->
    <el-table v-loading="loading" :data="aaList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />      
      <el-table-column label="参数主键" align="center" prop="configId" />      
      <el-table-column label="参数名称" align="center" prop="configName" :show-overflow-tooltip="true" />      
      <el-table-column label="参数键名" align="center" prop="configKey" :show-overflow-tooltip="true" />      
      <el-table-column label="参数键值" align="center" prop="configValue" :show-overflow-tooltip="true" />      
      <el-table-column label="系统内置（Y是 N否）" align="center" prop="configType">
        <template #default="scope">
          <dict-tag :options="sys_yes_no" :value="scope.row.configType" />
        </template>
      </el-table-column>      
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />      
      <el-table-column label="创建时间" align="center" prop="createdAt" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>      
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sys/aa/update']"
          >修改</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sys/aa/delete']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改配置对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="aaRef" :model="form" :rules="rules" label-width="80px">        
        <el-form-item label="参数名称" prop="configName">
          <el-input v-model="form.configName" placeholder="请输入参数名称" />
        </el-form-item>        
        <el-form-item label="参数键名" prop="configKey">
          <el-input v-model="form.configKey" placeholder="请输入参数键名" />
        </el-form-item>        
        <el-form-item label="参数键值" prop="configValue">
          <el-input v-model="form.configValue" type="textarea" placeholder="请输入参数键值" />
        </el-form-item>        
        <el-form-item label="系统内置（Y是 N否）" prop="configType">
          <el-select v-model="queryParams.configType" placeholder="系统内置（Y是 N否）" clearable>
            <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>        
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>      
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup name="SysAa">
import { listSysAa, getSysAa, delSysAa, addSysAa, updateSysAa } from "@/api/sys/aa.js";
const { proxy } = getCurrentInstance();
const { sys_yes_no } = proxy.useDict("sys_yes_no");
const aaList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,    
    configName: undefined,    
    configKey: undefined,    
    configType: undefined,    
  },
  rules: {    
    configId: [{ required: true, message: "参数主键不能为空", trigger: "blur" }],    
    configName: [{ required: true, message: "参数名称不能为空", trigger: "blur" }],    
    configKey: [{ required: true, message: "参数键名不能为空", trigger: "blur" }],    
  }
});
const { queryParams, form, rules } = toRefs(data);
/** 查询参数配置表列表 */
function getList() {
  loading.value = true;
  listSysAa(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
    aaList.value = response.data.rows;
    total.value = response.data.total;
    loading.value = false;
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {    
    configId: undefined,    
    configName: undefined,    
    configKey: undefined,    
    configValue: undefined,    
    configType: undefined,    
    remark: undefined,    
    createdAt: undefined,    
  };
  proxy.resetForm("aaRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {  
  ids.value = selection.map(item => item.configId);  
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加参数配置表";
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();  
  let queryId = {'configId': row.configId || ids.value[0]};  
  getSysAa(queryId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改参数配置表";
  });
}
/** 提交按钮 */
function submitForm() {  
  const id = form.value.configId;  
  proxy.$refs["aaRef"].validate(valid => {
    if (valid) {
      if (id != undefined) {
        updateSysAa(form.value).then(response => {
        proxy.$modal.msgSuccess("修改成功");
        open.value = false;
        getList();
        });
      } else {
        addSysAa(form.value).then(response => {
        proxy.$modal.msgSuccess("新增成功");
        open.value = false;
        getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row) {  
  const queryIds = {'configIdList': row.configId || ids.value};  
  proxy.$modal.confirm('是否确认删除所勾选的数据项？').then(function () {
    return delSysAa(queryIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}
getList();
</script>