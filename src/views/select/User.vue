<script lang="ts" setup>
//导入vue
import {ref, reactive} from 'vue'
//导入图标
import {Edit, More, Delete} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
//导入api集
import Api from '../../api'

import moment from "moment";

// =============定义存储储存的集合=============
var Data = reactive({
  // 输入的查询条件
  phone_str: ref(""),
  source_str: ref(""),
  // 存储从后台获取的所有来源信息
  facultyOptions: reactive([
    {id: '', name: ''},

  ]),
  // 存储选择后的值
  facultySelected: ref(""),

  //===========表格区域===============
  users: reactive([]),

  //============分页================
  //当前页
  currentPage: ref(1),
  //每页大小
  pageSize: ref(17),
  //记录条数
  total: ref(0),
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
    phone: Data.phone_str,//可以匹配多个字段
    source: Data.source_str,
  }
  // axios请求
  Api.user.getAll(params)
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.users = res.data.results.sort((a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime()) //这是升序，倒序的话翻过来
          Data.total = res.data.count
          // 提示成功
          ElMessage({
            message: '数据加载成功',
            type: 'success',
          })
        } else {
          // 提示成功
          ElMessage({
            message: '数据加载失败',
            type: 'error',
          })
        }
      }).catch((error) => {
    console.log('失败', error)
  })
}

// 时间戳转换成时间

// 显示全部数据
const listAllUser = () => {
  //清除查询数据
  Data.phone_str = "";
  Data.source_str = "";
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

// 时间格式化
const setDate = (row, column) => {
  var newdate = row[column.property];
  if (newdate == undefined) {
    return '';
  } else {
    return moment(newdate * 1000).format("YYYY-MM-DD HH:mm:ss")
  }
}

</script>

<template>
  <!-- 查询区域 -->
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="手机号:">
      <el-input v-model="Data.phone_str" placeholder="请输入查询的手机号"/>
    </el-form-item>
    <el-form-item label="来源:">
      <el-input v-model="Data.source_str" placeholder="请输入查询的来源"/>
    </el-form-item>
  </el-form>
  <el-form :inline="true" class="demo-form-inline" style="float: right">
    <el-form-item>
      <el-button type="primary" @click="getUser">
        <el-icon><component class="icons" is="Search"></component></el-icon>
        <span>查询</span>
      </el-button>
      <el-button type="primary" @click="listAllUser">全部</el-button>
      <el-button type="primary">添加</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格部分 -->
  <el-table :data="Data.users" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="phone" label="phone" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="uid" label="uid" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="source" label="source" align="center" width="80" :show-overflow-tooltip="true"/>
    <el-table-column prop="ctime" :formatter="setDate" label="ctime" align="center" width="200"
                     :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="utime" :formatter="setDate" label="utime" align="center" width="200"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="lastlogin" label="lastlogin" :formatter="setDate" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="realname" label="realname" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ad_source" label="ad_source" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="active_source" label="active_source" align="center" width="150"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="type" label="type" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="username" label="username" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="headurl" label="headurl" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="birthday" label="birthday" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="gender" label="gender" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="email" label="email" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="isdel" label="isdel" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="province" label="province" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="city" label="city" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="district" label="district" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="address" label="address" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="password" label="password" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="idcard" label="idcard" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="idcard_img" label="idcard_img" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="focus_area" label="focus_area" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="userdata" label="userdata" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="fntro" label="fntro" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="T_WEIXIN_UNIO" label="T_WEIXIN_UNIO" align="center" width="150"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="T_WEIXIN" label="T_WEIXIN" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="T_WEIBO" label="T_WEIBO" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="T_QQ" label="T_QQ" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column label="操作" align="center" width="150">
      <el-button type="primary" :icon="More" circle size="small"/>
      <el-button type="warning" :icon="Edit" circle size="small"/>
      <el-button type="danger" :icon="Delete" circle size="small"/>
    </el-table-column>
  </el-table>
  <!-- 分页部分 -->
  <!-- currentPage4[当前页],pageSize4[每页大小],total[记录条数],handleSizeChange[改变pagesize],handleCurrentChange[改变当前页]-->
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
</template>

<style scoped>

</style>
