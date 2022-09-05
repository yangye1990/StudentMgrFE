<script lang="ts" setup>
//导入vue
import {ref, reactive, getCurrentInstance} from 'vue'
//导入图标
import {Edit, More, Delete} from '@element-plus/icons-vue'
import {ElMessage,ElMessageBox} from 'element-plus'
//导入api集
import Api from '../../api'
import moment from "moment";

//获取当前的instance
const {proxy} = getCurrentInstance() as any

// 校验手机号是否存在
const validateSNoExists = (rule: any, value: any, callback: any) => {
  // 如果是修改，忽略校验
  if(Data.isEdit) callback();
  Api.loupankuhoutaidata.getAll({telA: value}).then((res) => {
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
  floorname_str: ref(""),


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
    choose_city: ref(""),
    email: ref(""),
    password: ref(""),
    selectname: ref(""),
    floorname: ref(""),
    floorpinyin: ref(""),
    thesaurus: ref(""),
    description: ref(""),
    address: ref(""),
    tags: ref(""),
    iphone: ref(""),
    area_code: ref(""),
    building: ref(""),
    property: ref(""),
    situation: ref(""),
    developers: ref(""),
    sales: ref(""),
    period: ref(""),
    introduction: ref(""),
  }),
  //是否查看状态
  isView: ref(false),
  //是否编辑状态
  isEdit: ref(false),

  // 弹出层表单的验证
  rules: reactive({
    info: [
      {required: true, message: "不能为空", trigger: "blur"},
    ]
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
    floorname: Data.floorname_str,

  }
  // axios请求
  Api.loupankuhoutaidata.getAll(params)
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.users = res.data.results
          Data.total = res.data.count
          // 提示成功
          ElMessage({
            message: '数据加载成功',
            type: 'success',
          })
        }
      }).catch((error) => {
    console.log('失败', error)
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
      // 修改
      Api.loupankuhoutaidata.edit(Data.dataForm.id, Data.dataForm).then((res) => {
        if (res.status === 201) {
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
      Api.loupankuhoutaidata.add(Data.dataForm).then((res) => {
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
const delLoupankuhoutaidata=(row:any)=>{
  let confirmStr = "您确定要删除【choose_city：" + row.choose_city + "\t floorname：" + row.floorname + "】信息吗？";
  ElMessageBox.confirm(confirmStr).then(()=>{
    // 删除！
    Api.loupankuhoutaidata.del(row.id).then((res)=>{
      if(res.status === 204){
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
  Data.dataForm.email = "";
  Data.dataForm.password = "";
  Data.dataForm.choose_city = "";
  Data.dataForm.selectname = "";
  Data.dataForm.floorname = "";
  Data.dataForm.floorpinyin = "";
  Data.dataForm.thesaurus = "";
  Data.dataForm.description = "";
  Data.dataForm.address = "";
  Data.dataForm.tags = "";
  Data.dataForm.iphone = "";
  Data.dataForm.area_code = "";
  Data.dataForm.building = "";
  Data.dataForm.property = "";
  Data.dataForm.situation = "";
  Data.dataForm.developers = "";
  Data.dataForm.sales = "";
  Data.dataForm.period = "";
  Data.dataForm.introduction = "";

  // 重置表单的校验
  proxy.$refs.dataFormRef.resetFields();
}

// 显示全部数据
const listAllUser = () => {
  //清除查询数据
  Data.floorname_str = ""//可以匹配多个字段

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
    <el-form-item label="楼盘名称:">
      <el-input v-model="Data.floorname_str" placeholder="请输入楼盘名称"/>
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
    <el-table-column prop="is_state" label="是否创建成功" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="email"  label="邮箱账号" align="center"  width="120" :show-overflow-tooltip="true" />
    <el-table-column prop="pass_word"  label="账号密码" show-password  align="center"  width="120" :show-overflow-tooltip="true" />
    <el-table-column prop="choose_city"  label="选择城市" align="center"  width="120" :show-overflow-tooltip="true" />
    <el-table-column prop="selectname" label="责任编辑" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="floorname" label="楼盘名称" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="floorpinyin" label="楼盘名称英文" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="thesaurus" label="楼盘关键词" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="description" label="一句话描述" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="address" label="楼盘地址" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="tags" label="楼盘标签" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="iphone" label="售楼电话" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="area_code" label="区 号" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="building" label="建筑类型" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="property" label="物业类型" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="situation" label="装修情况" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="developers" label="开发商" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="sales" label="销售状态" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="period" label="产权年限" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="introduction" label="项目介绍" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column label="操作" align="center" width="150px">
      <template #default="scope">
        <el-button type="primary" :icon="More" @click="viewData(scope.row)" circle size="small"/>
        <el-button type="warning" :icon="Edit" @click="editData(scope.row)" circle size="small"/>
        <el-button type="danger" :icon="Delete" @click="delLoupankuhoutaidata(scope.row)" circle size="small"/>
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
      <el-form-item label="邮箱账号" >
        <el-input v-model="Data.dataForm.email" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="请输入邮箱账号"></el-input>
      </el-form-item>
      <el-form-item label="账号密码" >
        <el-input v-model="Data.dataForm.password" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="请输入账号密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="选择城市" >
        <el-input v-model="Data.dataForm.choose_city" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="请输入选择的城市"></el-input>
      </el-form-item>
      <el-form-item label="选择编辑"  >
        <el-input v-model="Data.dataForm.selectname" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="请输入选择的编辑"></el-input>
      </el-form-item>
      <el-form-item label="楼盘名称"  >
        <el-input v-model="Data.dataForm.floorname" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="请输入楼盘名称"></el-input>
      </el-form-item>
      <el-form-item label="楼盘名称拼音"  >
        <el-input v-model="Data.dataForm.floorpinyin" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="请输入楼盘名称拼音"></el-input>
      </el-form-item>
      <el-form-item label="楼盘关键词"  >
        <el-input v-model="Data.dataForm.thesaurus" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="请输入楼盘关键词"></el-input>
      </el-form-item>
      <el-form-item label="一句话描述"  >
        <el-input v-model="Data.dataForm.description" :disabled="Data.isView" :suffix-icon="Edit"
                  placeholder="请输入一句话描述"></el-input>
      </el-form-item>
      <el-form-item label="楼盘地址"  >
        <el-input v-model="Data.dataForm.address" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入楼盘地址"></el-input>
      </el-form-item>
      <el-form-item label="楼盘标签" >
        <el-input v-model="Data.dataForm.tags" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入楼盘标签"></el-input>
      </el-form-item>
      <el-form-item label="楼盘热线" >
        <el-input v-model="Data.dataForm.iphone" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入楼盘热线"></el-input>
      </el-form-item>
      <el-form-item label="区 号" >
        <el-input v-model="Data.dataForm.area_code" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入区号"></el-input>
      </el-form-item>
      <el-form-item label="建筑类型" >
        <el-input v-model="Data.dataForm.building" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入建筑类型"></el-input>
      </el-form-item>
      <el-form-item label="物业类型" >
        <el-input v-model="Data.dataForm.property" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入物业类型"></el-input>
      </el-form-item>
      <el-form-item label="装修情况" >
        <el-input v-model="Data.dataForm.situation" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入装修情况"></el-input>
      </el-form-item>
      <el-form-item label="开发商" >
        <el-input v-model="Data.dataForm.developers" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入开发商"></el-input>
      </el-form-item>
      <el-form-item label="销售状态" >
        <el-input v-model="Data.dataForm.sales" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入销售状态"></el-input>
      </el-form-item>
      <el-form-item label="产权年限" >
        <el-input v-model="Data.dataForm.period" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入产权年限"></el-input>
      </el-form-item>
      <el-form-item label="项目介绍" >
        <el-input v-model="Data.dataForm.introduction" :disabled="Data.isView" :suffix-icon="Edit" placeholder="请输入项目介绍"></el-input>
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
