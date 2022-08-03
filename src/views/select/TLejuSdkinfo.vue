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
  dsj_sdk_track_id_str: ref(""),
  dsj_sdk_event_id_str: ref(""),
  dsj_sdk_event_type_str: ref(""),
  dsj_sdk_uid_str: ref(""),
  dsj_sdk_server_ts_str: ref(""),


  // 存储从后台获取的所有来源信息
  facultyOptions: reactive([
    {id:'',name:''},

  ]),
  // 存储选择后的值
  facultySelected: ref(""),

  //===========表格区域===============
  tlejusdkinfo: reactive([]),

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
    track_id: Data.dsj_sdk_track_id_str ,//可以匹配多个字段
    event_id: Data.dsj_sdk_event_id_str,
    event_type: Data.dsj_sdk_event_type_str,
    uid: Data.dsj_sdk_uid_str,
    server_ts: Data.dsj_sdk_server_ts_str,
  }
  // axios请求
  Api.t_leju_sdkinfo.getAll(params)
      .then((res) =>{
        // 判断是否成功
        console.log('成功',res)
        if (res.status === 200){
          Data.tlejusdkinfo = res.data.results.sort((a, b) => new Date(b.server_ts).getTime() - new Date(a.server_ts).getTime()) //这是升序，倒序的话翻
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
  Data.dsj_sdk_uid_str = "";
  Data.dsj_sdk_track_id_str = "";
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
    <el-form-item label="Track_Id:">
      <el-input v-model="Data.dsj_sdk_track_id_str" placeholder="请输入Track_Id" />
    </el-form-item>
    <el-form-item label="Uid:">
      <el-input v-model="Data.dsj_sdk_uid_str" placeholder="请输入Uid" />
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
  <el-table :data="Data.tlejusdkinfo" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="sdk_key" label="sdk_key"  align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="track_id" label="track_id"  align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="ad_source" label="ad_source"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="browser" label="browser"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="city" label="city"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="custom_id" label="custom_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="cur_page" label="cur_page"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="device_id" label="device_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="event_type" label="event_type"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="element_content" label="element_content"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="event_id" label="event_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="element_type" label="element_type"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext" label="ext"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="sub_appid" label="sub_appid"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="app_id" label="app_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="sdk_long" label="sdk_long"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="level1_page" label="level1_page"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="level2_page" label="level2_page"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="level3_page" label="level3_page"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="loc_city" label="loc_city"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="lk_source" label="lk_source"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="lk" label="lk"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="loc_province" label="loc_province"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="loc_source" label="loc_source"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="open_id" label="open_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="os" label="os"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="page_duration" label="page_duration"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="page_id" label="page_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="refer_host" label="refer_host"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="refer_page" label="refer_page"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="session" label="session"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="sdk_time" label="sdk_time" :formatter="setDate" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="tj_source" label="tj_source"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="tj_source_ext" label="tj_source_ext"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="uuid" label="uuid"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="union_id" label="union_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="user_agent" label="user_agent"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="uid" label="uid"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="sdk_v" label="sdk_v"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="lat" label="lat"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ip" label="ip"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="server_ts" label="server_ts" :formatter="setDate" align="center" width="200" :show-overflow-tooltip="true"/>
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
