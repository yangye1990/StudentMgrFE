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
  ext_str: ref(""),
  telA_str: ref(""),
  telAId_str: ref(""),
  biz_str: ref("laike_ail"),
  expiration_str: ref(""),
  source_str: ref(""),
  platform_str: ref(""),

  // 存储从后台获取的所有来源信息
  virtualnumOptions: reactive([
    {id: '', name: ''},

  ]),
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
    biz: 'laike_ali',
    expiration: Data.expiration_str,
    source: Data.source_str,
    platform: Data.platform_str,
  }
  // axios请求
  Api.virtualnums.getAll(params)
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
  Data.telA_str=""//可以匹配多个字段
  Data.telAId_str=""
  Data.biz_str=""
  Data.expiration_str=""
  Data.source_str=""
  Data.platform_str=""
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
      <el-input v-model="Data.phone_str" placeholder="请输入查询的手机号"/>
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
    <el-table-column prop="telA" label="telA" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="telAId" label="telAId" align="center" width="250" :show-overflow-tooltip="true"/>
    <el-table-column prop="biz" label="biz" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="expiration"  label="expiration" align="center" width="200"
                     :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="source" label="source" align="center" width="80"
                     :show-overflow-tooltip="true"/>
    <el-table-column prop="platform" label="platform" align="center" width="90" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.outerID" label="outerID" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.zid" label="zid" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.shopVersion" label="shopVersion" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.telaRole" label="telaRole" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.spmid" label="spmid" align="center" width="180" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.sourceShopCode" label="sourceShopCode" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.ascriptionShopCode" label="ascriptionShopCode" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.bizId" label="bizId" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.haofangSouce" label="haofangSouce" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.haofangMedium" label="haofangMedium" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.project_store_id" label="project_store_id" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext.src_project_store_id" label="src_project_store_id" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column label="操作" align="center"  width="150px">
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
