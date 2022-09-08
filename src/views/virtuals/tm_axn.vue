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
  Api.virtualnumsaxn.getAll({telA: value}).then((res) => {
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
  ext_str: ref(""),
  telA_str: ref(""),
  telAId_str: ref(""),
  biz_str: ref("leju_tmall_axn"),
  expiration_str: ref(""),
  source_str: ref(""),
  platform_str: ref(""),

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
  pageSize: ref(17),
  //记录条数
  total: ref(0),

  //========弹出层区域
  dialogFormVisible: ref(false),
  // 弹出层标题
  laterTitle: ref(""),
  // 表单数据
  dataForm: reactive({
    id: ref(""),
    telA: ref(""),
    telAId: ref(""),
    platform: ref(""),
    source: ref(""),
    biz: ref(""),
    expiration: ref(""),
    spmid: ref(""),
    sourceShopCode: ref(""),
    ascriptionShopCode: ref(""),
    shopVersion: ref(""),
    outerID: ref(""),
    zid: ref(""),
    telaRole: ref(""),
    bizId: ref(""),
    haofangSouce: ref(""),
    haofangMedium: ref(""),
    project_store_id: ref(""),
    src_project_store_id: ref(""),
    line: ref(""),
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
    telA: Data.telA_str,//可以匹配多个字段
    telAId: Data.telAId_str,
    biz: Data.biz_str,
    expiration: Data.expiration_str,
    source: Data.source_str,
    platform: Data.platform_str,
  }
  // axios请求
  Api.virtualnumsaxn.getAll(params)
      .then((res) => {
        // 开启loading
        openLoading()
        // 判断是否成功
        if (res.status === 200) {
          // 关闭loading
          closeLoading()
          Data.users = res.data.results
          Data.total = res.data.count
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
        Api.virtualnumsaxn.edit(Data.dataForm.id, Data.dataForm).then((res) => {
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
        Api.virtualnumsaxn.add(Data.dataForm).then((res) => {
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
const delVirtualnumsaxn=(row:any)=>{
  let confirmStr = "您确定要删除【TelA：" + row.telA + "\t Biz：" + row.biz + "】信息吗？";
  ElMessageBox.confirm(confirmStr).then(()=>{
    // 开启loading
    openLoading()
    // 删除！
    Api.virtualnumsaxn.del(row.id).then((res)=>{
      if(res.status === 204){
        //关闭loading
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
  Data.dataForm.telA = "";
  Data.dataForm.telAId = "";
  Data.dataForm.platform = "";
  Data.dataForm.source = "";
  Data.dataForm.biz = "";
  Data.dataForm.expiration = "";
  Data.dataForm.spmid = "";
  Data.dataForm.sourceShopCode = "";
  Data.dataForm.ascriptionShopCode = "";
  Data.dataForm.shopVersion = "";
  Data.dataForm.outerID = "";
  Data.dataForm.zid = "";
  Data.dataForm.telaRole = "";
  Data.dataForm.bizId = "";
  Data.dataForm.haofangSouce = "";
  Data.dataForm.haofangMedium = "";
  Data.dataForm.project_store_id = "";
  Data.dataForm.src_project_store_id = "";
  Data.dataForm.line = "";
  // 重置表单的校验
  proxy.$refs.dataFormRef.resetFields();
}

// 显示全部数据
const listAllUser = () => {
  //清除查询数据
  Data.telA_str = ""//可以匹配多个字段
  Data.telAId_str = ""
  Data.biz_str = ""
  Data.expiration_str = ""
  Data.source_str = ""
  Data.platform_str = ""
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
    <el-form-item label="手机号:">
      <el-input v-model="Data.telA_str" placeholder="请输入查询的手机号"/>
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
    <el-table-column prop="line" label="line" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="telX"  label="telX" align="center"  width="120" :show-overflow-tooltip="true" />
    <el-table-column prop="subId" label="subId" align="center" width="250" :show-overflow-tooltip="true"/>
    <el-table-column prop="telA" label="telA" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="telAId" label="telAId" align="center" width="250" :show-overflow-tooltip="true"/>
    <el-table-column prop="biz" label="biz" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="expiration" label="expiration" align="center" width="200"
                     :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="source" label="source" align="center" width="80"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="platform" label="platform" align="center" width="90" :show-overflow-tooltip="true"/>
    <el-table-column prop="outerID" label="outerID" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="zid" label="zid" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="shopVersion" label="shopVersion" align="center" width="120"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="telaRole" label="telaRole" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="spmid" label="spmid" align="center" width="180" :show-overflow-tooltip="true"/>
    <el-table-column prop="sourceShopCode" label="sourceShopCode" align="center" width="300"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="ascriptionShopCode" label="ascriptionShopCode" align="center" width="300"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="bizId" label="bizId" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="haofangSouce" label="haofangSouce" align="center" width="300"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="haofangMedium" label="haofangMedium" align="center" width="300"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="project_store_id" label="project_store_id" align="center" width="300"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="src_project_store_id" label="src_project_store_id" align="center" width="300"
                     :show-overflow-tooltip="true"/>
    <el-table-column label="操作" align="center" width="150px">
      <template #default="scope">
        <el-button type="primary" :icon="More" @click="viewData(scope.row)" circle size="small"/>
        <el-button type="warning" :icon="Edit" @click="editData(scope.row)" circle size="small"/>
        <el-button type="danger" :icon="Delete" @click="delVirtualnumsaxn(scope.row)" circle size="small"/>
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
<!--      <el-form-item label="id" >-->
<!--        <el-input v-model="Data.dataForm.id" :disabled="Data.isEdit||Data.isView" :suffix-icon="Edit"-->
<!--                  placeholder="默认自增"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="正式or测试线" prop="line">
        <el-input v-model="Data.dataForm.line" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="正式or测试"></el-input>
      </el-form-item>
      <el-form-item label="主叫方" prop="telA">
        <el-input v-model="Data.dataForm.telA" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="telA"></el-input>
      </el-form-item>
      <el-form-item label="业务标识" prop="telAId">
        <el-input v-model="Data.dataForm.telAId" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="telAid"></el-input>
      </el-form-item>
      <el-form-item label="业务标识" prop="biz">
        <el-input v-model="Data.dataForm.biz" :disabled="Data.isView" :suffix-icon="Edit" placeholder="biz"></el-input>
      </el-form-item>
      <el-form-item label="有效时长" prop="expiration">
        <el-input v-model="Data.dataForm.expiration" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="expiration"></el-input>
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-input v-model="Data.dataForm.source" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="source"></el-input>
      </el-form-item>
      <el-form-item label="平台" prop="platform">
        <el-input v-model="Data.dataForm.platform" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="platform"></el-input>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="Data.dataForm.spmid" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="spmid"></el-input>
      </el-form-item>
      <el-form-item label="来源店铺">
        <el-input v-model="Data.dataForm.sourceShopCode" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="sourceShopCode"></el-input>
      </el-form-item>
      <el-form-item label="归属店铺">
        <el-input v-model="Data.dataForm.ascriptionShopCode" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="ascriptionShopCode"></el-input>
      </el-form-item>
      <el-form-item label="店铺版本">
        <el-input v-model="Data.dataForm.shopVersion" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="shopVersion"></el-input>
      </el-form-item>
      <el-form-item label="楼盘id">
        <el-input v-model="Data.dataForm.outerID" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="outerID"></el-input>
      </el-form-item>
      <el-form-item label="置业顾问ID">
        <el-input v-model="Data.dataForm.zid" :disabled="Data.isView" :suffix-icon="Edit" placeholder="zid"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="Data.dataForm.telaRole" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="telaRole"></el-input>
      </el-form-item>
      <el-form-item label="业务方id">
        <el-input v-model="Data.dataForm.bizId" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="bizId"></el-input>
      </el-form-item>
      <el-form-item label="流量来源1级">
        <el-input v-model="Data.dataForm.haofangSouce" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="haofangSouce"></el-input>
      </el-form-item>
      <el-form-item label="流量来源2级">
        <el-input v-model="Data.dataForm.haofangMedium" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="haofangMedium"></el-input>
      </el-form-item>
      <el-form-item label="归属项目店">
        <el-input v-model="Data.dataForm.project_store_id" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="project_store_id"></el-input>
      </el-form-item>
      <el-form-item label="来源项目店">
        <el-input v-model="Data.dataForm.src_project_store_id" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="src_project_store_id"></el-input>
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
