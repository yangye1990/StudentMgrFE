<script lang="ts" setup>
//导入vue
import {ref, reactive, getCurrentInstance} from 'vue'
//导入图标
import {Edit, More, Delete} from '@element-plus/icons-vue'
import {ElMessage,ElMessageBox} from 'element-plus'
//导入api集
import Api from '../../api'
import moment from "moment";

import { openLoading, closeLoading } from "../../utils/loading";

//获取当前的instance
const {proxy} = getCurrentInstance() as any

// 校验手机号是否存在
const validateSNoExists = (rule: any, value: any, callback: any) => {
  // 如果是修改，忽略校验
  if(Data.isEdit) callback();
  Api.tuwenzhiboofficialxpath.getAll({telA: value}).then((res) => {
    if (res.data.count > 0) {
      console.log(value)
      callback(new Error("telA已存在"))
    } else {
      callback()
    }
  })

}


// =============定义存储储存的集合=============
var Data = reactive({
  // 输入的查询条件
  info_str: ref(""),


  // 存储从后台获取的所有来源信息
  virtualnumOptions: reactive([
    {id: '', name: ''},

  ]),
  telaRole: reactive(['']),
  // 存储选择后的值
  virtualnumSelected: ref(""),

  //===========表格区域===============
  users: reactive([]),

  //============分页================
  //当前页
  currentPage: ref(1),
  //每页大小
  pageSize: ref(20),
  //记录条数
  total: ref(0),

  //========弹出层区域
  dialogFormVisible: ref(false),
  // 弹出层标题
  laterTitle: ref(""),
  // 表单数据
  dataForm: reactive({
    id: ref(""),
    element_info: ref(""),
    element_info_one: ref(""),
    element_info_two: ref(""),
    element_info_three: ref(""),
    find_type: ref("XPATH"),
    operate_type: ref("click"),
    info: ref(""),
  }),
  //是否查看状态
  isView: ref(false),
  //是否编辑状态
  isEdit: ref(false),

  // 弹出层表单的验证
  rules: reactive({
    telAId: [
      {required: true, message: "telAId不能为空", trigger: "blur"},
    ],
    platform: [
      {required: true, message: "platform不能为空", trigger: "blur"},
    ],
    source: [{required: true, message: "source不能为空", trigger: "blur"}],
    biz: [
      {required: true, message: "biz不能为空", trigger: "blur"},
    ],
    expiration: [{required: true, message: "expiration不能为空", trigger: "blur"}],
    telA: [
      {required: true, message: "手机号码不能为空", trigger: "blur"},
      {
        pattern: /^[1][3456789]\d{9}$/,
        message: "手机号码必须要符合规范",
        trigger: "blur",
      },
      {validator: validateSNoExists, trigger: 'blur' }
    ],
  }),


})
//改变pagesize
const handleSizeChange = (size: any) => {
  // 修改每页的记录条数
  Data.pageSize = size;
  // 重新获取数据
  getUser();
}
//改变当前页
const handleCurrentChange = (page: any) => {
  //修改默认展示的页码
  Data.currentPage = page;
  getUser();
}

// 获取查询user信息
const getUser = () => {
  //定义一个集合存储参数
  let params = {
    page: Data.currentPage,
    size: Data.pageSize,
    info: Data.info_str,

  }
  // axios请求
  Api.tuwenzhiboofficialxpath.getAll(params)
      .then((res) => {
        // 开启loading
        openLoading()
        // 判断是否成功
        if (res.status === 200) {
          // 关闭loading
          closeLoading()
          Data.users = res.data.results
          Data.total = res.data.count
        } else {
        }
      })
}

// 添加数据
const addData = () => {
  Data.dialogFormVisible = true;
  Data.laterTitle = "【添加数据信息】"
}
// 查看数据信息
const viewData = (row: any) => {
  Data.isView = true;
  Data.dialogFormVisible = true;
  Data.laterTitle = "【查看数据信息】";
  Data.dataForm = JSON.parse(JSON.stringify(row));
}
//编辑数据信息
const editData = (row: any) => {
  Data.isEdit = true;
  Data.dialogFormVisible = true;
  Data.laterTitle = "【编辑数据信息】";
  Data.dataForm = JSON.parse(JSON.stringify(row));
}

// === 弹出层表单的提交===
const laterCommit = () => {
  // 提交！
  proxy.$refs.dataFormRef.validate((valid: boolean)=>{
    // 添加或者修改
    if (Data.isEdit) {
      // 开启loading
      openLoading()
      // 修改
      Api.tuwenzhiboofficialxpath.edit(Data.dataForm.id, Data.dataForm).then((res) => {
        if (res.status === 201) {
          // 关闭loading
          closeLoading()
          // 重新加载数据
          getUser();
          // 关闭弹出层
          closeLater();
          // 提示添加成功！
          ElMessage({
            message: "信息修改成功！",
            type: 'success'
          })
        }
      })

    } else {
      // 添加
      Api.tuwenzhiboofficialxpath.add(Data.dataForm).then((res) => {
        // 关闭loading
        closeLoading()
        // 重新加载数据
        getUser();
        // 关闭弹出层
        closeLater();
        // 提示添加成功！
        ElMessage({
          message: "数据添加成功！",
          type: 'success'
        })
      })
    }
  })
};

// === 实现数据的删除 ====
const delTuwenzhiboofficialxpath=(row:any)=>{
  let confirmStr = "您确定要删除【info：" + row.info + "\t find_type：" + row.find_type + "】信息吗？";
  ElMessageBox.confirm(confirmStr).then(()=>{
    // 开启loading
    openLoading()
    // 删除！
    Api.tuwenzhiboofficialxpath.del(row.id).then((res)=>{
      if(res.status === 204){
        // 关闭loading
        closeLoading()
        // 重新加载数据
        getUser();
        // 关闭弹出层
        closeLater();
        // 提示添加成功！
        ElMessage({
          message:"信息删除成功！",
          type:'success'
        })
      }
    })
  })
}

// 关闭弹出层
const closeLater = () => {
  Data.dialogFormVisible = false;
  Data.isView = false;
  Data.isEdit = false;
  //清除表单数;
  Data.dataForm.id = "";
  Data.dataForm.element_info = "";
  Data.dataForm.element_info_one = "";
  Data.dataForm.element_info_two = "";
  Data.dataForm.element_info_three = "";
  // Data.dataForm.find_type = "";
  // Data.dataForm.operate_type = "";
  Data.dataForm.info = "";

  // 重置表单的校验
  proxy.$refs.dataFormRef.resetFields();
}

// 显示全部数据
const listAllUser = () => {
  //清除查询数据
  Data.info_str = ""//可以匹配多个字段

  // 重新请求
  getUser();
}

//定义页面加载的时候自动执行的函数
const autoRun = () => {
  //获取user信息函数
  getUser()
}
// 调用自动执行的函数
autoRun()


</script>

<template>
  <!-- 查询区域 -->
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="元素名称:">
      <el-input v-model="Data.info_str" placeholder="请输入元素名称"/>
    </el-form-item>
  </el-form>
  <el-form :inline="true" class="demo-form-inline" style="float: right">
    <el-form-item>
      <el-button type="primary" @click="getUser">
        <el-icon>
          <component class="icons" is="Search"></component>
        </el-icon>
        <span>查询</span>
      </el-button>
      <el-button type="primary" @click="listAllUser">全部</el-button>
      <el-button type="primary" @click="addData">添加</el-button>
    </el-form-item>
  </el-form>

  <!-- 表格部分 -->
  <el-table :data="Data.users" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="info" label="info" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="find_type"  label="find_type" align="center"  width="120" :show-overflow-tooltip="true" />
    <el-table-column prop="operate_type" label="operate_type" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="element_info" label="element_info" align="center"  :show-overflow-tooltip="true"/>
    <el-table-column prop="element_info_one" label="element_info_one" align="center"  :show-overflow-tooltip="true"/>
    <el-table-column prop="element_info_two" label="element_info_two" align="center"  :show-overflow-tooltip="true"/>
    <el-table-column prop="element_info_three" label="element_info_three" align="center"  :show-overflow-tooltip="true"/>
    <el-table-column label="操作" align="center" width="150px">
      <template #default="scope">
        <el-button type="primary" :icon="More" @click="viewData(scope.row)" circle size="small"/>
        <el-button type="warning" :icon="Edit" @click="editData(scope.row)" circle size="small"/>
        <!--        <el-button type="danger" :icon="Delete" @click="delTuwenzhiboofficialxpath(scope.row)" circle size="small"/>-->
      </template>

    </el-table-column>
  </el-table>

  <!-- 分页部分 -->
  <el-pagination style="margin-top: 20px;"
                 background
                 v-model:currentPage="Data.currentPage"
                 v-model:page-size="Data.pageSize"
                 :page-sizes="[17,30, 50, 100, 150]"
                 :small="small"
                 :disabled="disabled"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="Data.total"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
  />

  <!-- 弹出层-->
  <el-dialog v-model="Data.dialogFormVisible" width="80%" @close="closeLater">
    <!-- 标题部分-->
    <template #title>
      <div style="font-size: 18px; color: #409eff; font-weight: bold; text-align: left ">{{ Data.laterTitle }}</div>
    </template>
    <el-form :model="Data.dataForm" :rules="Data.rules" ref="dataFormRef" :inline="true" label-width="100px">
      <el-form-item label="元素" prop="element_info">
        <el-input v-model="Data.dataForm.element_info" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="element_info"></el-input>
      </el-form-item>
      <el-form-item label="元素1" >
        <el-input v-model="Data.dataForm.element_info_one" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="element_info_one"></el-input>
      </el-form-item>
      <el-form-item label="元素2" >
        <el-input v-model="Data.dataForm.element_info_two" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="element_info_two"></el-input>
      </el-form-item>
      <el-form-item label="元素3" >
        <el-input v-model="Data.dataForm.element_info_three" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="element_info_three"></el-input>
      </el-form-item>
      <el-form-item label="查找元素方法" prop="find_type">
        <el-input v-model="Data.dataForm.find_type" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="find_type"></el-input>
      </el-form-item>
      <el-form-item label="事件" prop="operate_type">
        <el-input v-model="Data.dataForm.operate_type" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="operate_type"></el-input>
      </el-form-item>
      <el-form-item label="元素名称" prop="info">
        <el-input v-model="Data.dataForm.info" :disabled="Data.isView" :suffix-icon="Edit" placeholder="info"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-show="!Data.isView" @click="laterCommit">提交</el-button>
      <el-button @click="closeLater">取 消</el-button>
    </div>
  </el-dialog>

</template>

<style scoped>

</style>
