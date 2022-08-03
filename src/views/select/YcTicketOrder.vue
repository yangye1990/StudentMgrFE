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
  cpid_user_id_str: ref(""),
  cpid_phone_str: ref(""),
  cpid_ticket_status_str:ref(""),
  cpid_ticket_id_str:ref(""),

  // 存储从后台获取的所有来源信息
  facultyOptions: reactive([
    {id:'',name:''},

  ]),
  // 存储选择后的值
  facultySelected: ref(""),

  //===========表格区域===============
  yctticketorder: reactive([]),

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
    user_id:Data.cpid_user_id_str ,//可以匹配多个字段
    phone:Data.cpid_phone_str ,//可以匹配多个字段
    ticket_status:Data.cpid_ticket_status_str,
    ticket_id:Data.cpid_ticket_id_str,
  }
  // axios请求
  Api.yc_t_ticket_order.getAll(params)
      .then((res) =>{
        // 判断是否成功
        console.log('成功',res)
        if (res.status === 200){
          Data.yctticketorder = res.data.results.sort((a, b) => new Date(b.update_time).getTime() - new Date(a.update_time).getTime()) //这是升序，倒序的话翻过来
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
  Data.cpid_user_id_str = "";
  Data.cpid_phone_str = "";
  Data.cpid_ticket_status_str = "";
  Data.cpid_ticket_id_str = "";
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
    <el-form-item label="用户UID:">
      <el-input v-model="Data.cpid_user_id_str" placeholder="请输入用户UID" />
    </el-form-item>
    <el-form-item label="手机号:">
      <el-input v-model="Data.cpid_phone_str" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="车票ID:">
      <el-input v-model="Data.cpid_ticket_id_str" placeholder="请输入来源" />
    </el-form-item>
    <el-form-item label="车票状态:">
      <el-input v-model="Data.cpid_ticket_status_str" placeholder="请输入Ticket_Status" />
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
  <el-table :data="Data.yctticketorder" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="ids" label="order_id"  align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="user_id" label="user_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="activity_id" label="activity_id" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="order_source" label="order_source" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="ticket_id" label="ticket_id" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="phone" label="phone" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ticket_status" label="ticket_status" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="get_time" :formatter="setDate" label="get_time" align="center" width="200" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="create_time" :formatter="setDate" label="create_time" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="update_time" :formatter="setDate" label="update_time" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="write_off_time" :formatter="setDate" label="write_off_time" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="write_off_code" :formatter="setDate" label="write_off_code" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="date_update_time" :formatter="setDate" label="date_update_time" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="recommend_uid" label="recommend_uid"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="write_off_uid" label="write_off_uid"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="order_type" label="order_type"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ticket_node" label="ticket_node"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="dist_id" label="dist_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="write_off_value" label="write_off_value"  align="center" width="150" :show-overflow-tooltip="true"/>
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
