<template>
   <div class="app-container">
     <!-- 选择数据表 -->
      <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true">
         <el-form-item label="表名" prop="tableName">
            <el-select
               v-model="queryParams.tableName"
               placeholder="数据表名"
               clearable
               style="width: 240px"
            >
               <el-option
                  v-for="item in tableOptions"
                  :key="item.tableName"
                  :label="item.tableName"
                  :value="item.tableName"
               />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">使用此表创建</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>
      <!-- 数据表信息 -->
      <el-form :model="formInfo" :rules="rules" ref="queryRef11" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Struct名称" prop="structName">
              <el-input v-model="formInfo.structName" placeholder="首字母自动转换大写" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="description">
              <template #label>
                Struct中文名称
                <el-tooltip content="struct的中文描述，用作模块描述" placement="top">
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
              </template>
              <el-input v-model="formInfo.description" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="moduleName">
              <template #label>
                模块名
                <el-tooltip content="可理解为子系统名，例如 system" placement="top">
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
              </template>
              <el-input v-model="formInfo.moduleName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="businessName">
              <template #label>
                业务名
                <el-tooltip content="文件和路由名字，例如 user" placement="top">
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
              </template>
              <el-input v-model="formInfo.businessName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="apiFile">
              <template #label>
                api文件夹
                <el-tooltip content="api文件夹的名称api文件夹的名称" placement="top">
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
              </template>
              <el-input v-model="formInfo.apiFile" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="tplCategory">
              <template #label>生成模板</template>
              <el-select v-model="formInfo.tplCategory">
                <el-option label="单表（增删改查）" value="crud" key="crud"  />
                <el-option label="树表（增删改查）" value="tree" key="tree"  />
              </el-select>
            </el-form-item>
          </el-col>
          <el-form-item>
            <template #label>
              <el-tooltip content="注：把自动生成的API注册进数据库" placement="bottom" effect="light">
                <div> 自动创建API </div>
              </el-tooltip>
            </template>
            <el-checkbox v-model="formInfo.autoCreateApiToSql" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <el-tooltip content="注：自动迁移生成的文件到ymal配置的对应位置" placement="bottom" effect="light">
                <div> 自动移动文件 </div>
              </el-tooltip>
            </template>
            <el-checkbox v-model="formInfo.autoMoveFile" />
          </el-form-item>
        </el-row>
      </el-form>
      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="primary"
               plain
               icon="Plus"
               @click="handleAdd"
               v-hasPermi="['tool/gen/create']"
            >新增Field</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch"></right-toolbar>
      </el-row>

      <!-- 字段数据数据 -->
      <el-alert
          title="⚠️表字段中的updated_at、deleted_at的字段在此列表中已经隐藏"
          type="warning"
          show-icon
          v-show="columnList.length > 0"
        />
      <el-table ref="dragTable" :data="columnList" row-key="columnId" :max-height="tableHeight" width="100%">
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column
            label="字段列名"
            prop="columnName"
            width="150"
            :show-overflow-tooltip="true"
            fixed
          />
          <el-table-column label="字段描述" width="150" fixed>
            <template #default="scope">
              <el-input v-model="scope.row.columnComment"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            class-name="allowDrag"
            label="物理类型"
            prop="columnType"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="go类型" width="120">
            <template #default="scope">
              <el-select v-model="scope.row.goType">
                <el-option label="string" value="string" />
                <el-option label="int" value="int" />
                <el-option label="uint" value="uint" />
                <el-option label="int64" value="int64" />
                <el-option label="uint64" value="uint64" />
                <el-option label="float32" value="float32" />
                <el-option label="float64" value="float64" />
                <el-option label="bool" value="bool" />
                <el-option label="*gtime.Time" value="*gtime.Time" />
                <el-option label="*gtime.Json" value="*gtime.Json" />
                <el-option label="[]byte" value="[]byte" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="go属性" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.goField"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="json属性" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.htmlField" />
            </template>
          </el-table-column>
          <el-table-column label="插入" width="50">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isInsert" :disabled="scope.row.isPk=='1' || scope.row.columnName=='created_at'"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="编辑" width="50">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isEdit" :disabled="scope.row.isPk=='1' || scope.row.columnName=='created_at'"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="列表" width="50">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isList"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="查询" width="50">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isQuery"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="查询方式" width="120">
            <template #default="scope">
              <el-select v-model="scope.row.queryType">
                <el-option label="=" value="EQ" />
                <el-option label="!=" value="NE" />
                <el-option label=">" value="GT" />
                <el-option label=">=" value="GTE" />
                <el-option label="<" value="LT" />
                <el-option label="<=" value="LTE" />
                <el-option label="LIKE" value="LIKE" />
                <!-- <el-option label="BETWEEN" value="BETWEEN" /> -->
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="必填" width="50">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isRequired"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="显示类型" width="150">
            <template #default="scope">
              <el-select v-model="scope.row.htmlType">
                <el-option label="文本框" value="input" />
                <el-option label="文本域" value="textarea" />
                <el-option label="下拉框" value="select" />
                <el-option label="单选框" value="radio" />
                <el-option label="复选框" value="checkbox" />
                <el-option label="日期控件" value="datetime" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="字典类型" width="150">
            <template #default="scope">
              <el-select v-model="scope.row.dictType" clearable filterable placeholder="请选择">
                <el-option
                  v-for="dict in dictOptions"
                  :key="dict.dictType"
                  :label="dict.dictName"
                  :value="dict.dictType">
                  <span style="float: left">{{ dict.dictName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ dict.dictType }}</span>
              </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      <el-form label-width="100px">
        <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
          <el-button @click="handlePreview()">预览代码</el-button>
          <el-button type="primary" @click="handleGenTable()">生成代码</el-button>
        </el-form-item>
      </el-form>
      <!-- 预览界面 -->
    <el-dialog :title="preview.title" v-model="preview.open" width="80%" top="5vh" append-to-body custom-class="scrollbar">
      <el-tabs v-model="preview.activeName">
        <el-tab-pane
          v-for="(value, key) in preview.data"
          :label="key"
          :name="key"
          :key="key"
        >
          <el-link :underline="false" icon="DocumentCopy" v-copyText="value" v-copyText:callback="copyTextSuccess" style="float:right">&nbsp;复制</el-link>
          <pre><code class="hljs" v-html="highlightedCode(value, key)"></code></pre>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
   </div>
</template>

<script setup name="Gen">
import { genTableList, getColumnList, previewTable } from "@/api/tool/gen";
import { listType } from "@/api/system/dict/type";
// import router from "@/router";
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { useDisabled } from "element-plus";


const router = useRouter();
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const tableHeight = ref(document.documentElement.scrollHeight - 315 + "px");
const columnList = ref([]);
const open = ref(false);
const loading = ref(false);
const showSearch = ref(true);
const dictOptions = ref([]);
const tableOptions = ref([]);


const data = reactive({
  formInfo: {
    structName: undefined,
    description: undefined,
    moduleName: undefined,
    businessName: undefined,
    apiFile: undefined,
    tplCategory: undefined,
    autoCreateApiToSql: false,
    autoMoveFile: false,
    fields: []
  },
  queryParams: {
    tableName: undefined,
  },
  rules: {
    structName: [{ required: true, message: "struct名称不能为空", trigger: "blur" }],
    description: [{ required: true, message: "Struct中文名称不能为空", trigger: "blur" }],
    moduleName: [{ required: true, message: "模块名不能为空", trigger: "blur" }],
    businessName: [{ required: true, message: "业务名不能为空", trigger: "blur" }],
    apiFile: [{ required: true, message: "api文件夹不能为空", trigger: "blur" }],
    tplCategory: [{ required: true, message: "生成模板不能为空", trigger: "blur" }],

  },
  preview: {
    open: false,
    title: "代码预览",
    data: {},
    activeName: "server_api"
  }
});

const { queryParams, formInfo, rules, preview } = toRefs(data);

/** 当前数据库所有表名 */
function getGenTableList() {
  loading.value = true;
  genTableList().then(response => {
    tableOptions.value = response.data.tables;
    loading.value = false;
  });
}
/** 获取当前表所有字段 */
function getGenColumnList() {
  loading.value = true;
  getColumnList(queryParams.value).then(response => {
    columnList.value = response.data.columnList.filter(item=>{
          return !['updated_at','deleted_at'].includes(item.columnName)
        });
    setGenForm(response.data.tableInfo);
    loading.value = false;
  });
}
/** 设置表单数值 */
function setGenForm(tableInfo) {
  reset();
  formInfo.value.structName = tableInfo.tableName;
  let str = tableInfo.tableName;
  formInfo.value.moduleName = queryParams.value.tableName.split("_")[0]
  let moduleNameIndex = queryParams.value.tableName.indexOf("_")
  formInfo.value.businessName = queryParams.value.tableName.substr(moduleNameIndex + 1,queryParams.value.tableName.length)
  // formInfo.value.businessName = queryParams.value.tableName
  formInfo.value.description = tableInfo.tableComment;
  formInfo.value.apiFile = "v1";
  formInfo.value.tplCategory = 'crud';
}
/** 搜索按钮操作 */
function handleQuery() {
  // queryParams.value.pageNum = 1;
  // getList();
  getGenColumnList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  columnList.value = [];
  reset();
  // handleQuery();
}
/** 新增按钮操作 */
function handleAdd() {
  
}
/** 重置新增的表单以及其他数据  */
function reset() {
  formInfo.value = {
    structName: undefined,
    description: undefined,
    moduleName: undefined,
    businessName: undefined,
    apiFile: undefined,
    tplCategory: undefined,
    autoCreateApiToSql: false,
    autoMoveFile: false,
    fields: []
  };
  proxy.resetForm("queryRef11");
}
/** 生成代码操作 */
function handleGenTable() {
  formInfo.value.fields = columnList.value;
  console.log(formInfo.value);
}
/** 预览按钮 */
function handlePreview() {
  formInfo.value.fields = columnList.value;
  previewTable(formInfo.value).then(response => {
    preview.value.data = response.data;
    preview.value.open = true;
    // for (var i=0; i < response.data.length; i++) {
    //   console.log(response.data[i]);
    //   // hljs.highlightElement(response.data[i]);
    // }
  });

  
}
/** 查询字典下拉列表 */
function dictOptionselect() {
  listType({pageSize: 100}).then(response => {
    dictOptions.value = response.data.rows;
  });
}
/** 复制代码成功 */
function copyTextSuccess(){
  proxy.$modal.msgSuccess("复制成功");
}
 /** 高亮显示 */
function highlightedCode(code, key) {
  // let language = "";
  // if (key.indexOf("service_")) {
  //   language = "go";
  // }else if (key.indexOf("web_")) {
  //   language = "xml";
  // }
  // const result = hljs.highlight(language, code || "", true);
  const result = hljs.highlightAuto(code, ["go", "xml", "html", "vue", "javascript"]);
  return result.value || '&nbsp;';
}
  
getGenTableList();
dictOptionselect();
</script>
