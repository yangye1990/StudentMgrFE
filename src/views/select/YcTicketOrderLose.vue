<script lang="ts" setup>
//导入vue
import { ref,reactive } from 'vue'
//导入图标
import { Edit,More,Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
//导入api集
import Api from '../../api'

import moment from "moment";

// =============定义存储储存的集合=============
var Data = reactive({
  // 输入的查询条件
  cp_order_id_str: ref(""),
  cp_operator_phone_str: ref(""),
  cp_house_unique_id_str:ref(""),
  cp_ext_str:ref(""),

  // 存储从后台获取的所有来源信息
  facultyOptions: reactive([
    {id:'',name:''},

  ]),
  // 存储选择后的值
  facultySelected: ref(""),

  //===========表格区域===============
  yctticketorderlose: reactive([]),

  //============分页================
  //当前页
  currentPage: ref(1),
  //每页大小
  pageSize: ref(17),
  //记录条数
  total:ref(0),
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
const getUser=()=>{
  //定义一个集合存储参数
  let params = {
    page: Data.currentPage,
    size: Data.pageSize,
    order_id:Data.cp_order_id_str ,//可以匹配多个字段
    operator_phone:Data.cp_operator_phone_str ,//可以匹配多个字段
    house_unique_id:Data.cp_house_unique_id_str,
    ext:Data.cp_ext_str,
  }
  // axios请求
  Api.yc_t_ticket_order_lose.getAll(params)
      .then((res) =>{
        // 判断是否成功
        console.log('成功',res)
        if (res.status === 200){
          Data.yctticketorderlose = res.data.results.sort((a, b) => new Date(b.date_update_time).getTime() - new Date(a.date_update_time).getTime())
          Data.total = res.data.count
          // 提示成功
          ElMessage({
            message: '数据加载成功',
            type: 'success',
          })
        } else {

        }
      }).catch((error)=>{
    console.log('失败',error)
  })
}

// 时间戳转换成时间

// 显示全部数据
const listAllUser=()=>{
  //清除查询数据
  Data.cp_order_id_str = "";
  Data.cp_operator_phone_str = "";
  Data.cp_house_unique_id_str = "";
  Data.cp_ext_str = "";
  // 重新请求
  getUser();
}

//定义页面加载的时候自动执行的函数
const autoRun=()=>{
  //获取user信息函数
  getUser()
}
// 调用自动执行的函数
autoRun()

// 时间格式化
const setDate=(row,column)=>{
  var newdate = row[column.property];
  if(newdate == undefined) {
    return '';
  } else {
    return moment(newdate *1000 ).format("YYYY-MM-DD HH:mm:ss")
  }
}

</script>

<template>
  <!-- 查询区域 -->
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="订单ID:">
      <el-input v-model="Data.cp_order_id_str" placeholder="请输入order_id" />
    </el-form-item>
    <el-form-item label="楼盘唯一ID:">
      <el-input v-model="Data.cp_house_unique_id_str" placeholder="请输入楼盘唯一ID" />
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
  <el-table :data="Data.yctticketorderlose" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="ids" label="id"  align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="order_id" label="order_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="full_source" label="full_source" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext_zid" label="ext_zid" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="third_account_id" label="third_account_id" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="third_ticket_id" label="third_ticket_id" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="house_unique_id" label="house_unique_id" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="operator" label="operator" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="operator_time" :formatter="setDate" label="operator_time" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="date_update_time" label="date_update_time"  align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="operator_mail" label="operator_mail" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="operator_phone" label="operator_phone" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="tm_source" label="tm_source" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="send_time" :formatter="setDate" label="send_time" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="order_small_b" label="order_small_b"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="push_small_b" label="push_small_b"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="udc_result_status" label="udc_result_status"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ad_source" label="ad_source"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext" label="ext"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="first_house_unique_id" label="first_house_unique_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="follow_id" label="follow_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column label="操作" align="center" width="150" >
      <el-button type="primary" :icon="More" circle size="small" />
      <el-button type="warning" :icon="Edit" circle size="small" />
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
