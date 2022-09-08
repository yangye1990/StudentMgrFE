<script lang="ts" setup>
//导入vue
import { ref,reactive } from 'vue'
//导入图标
import { Edit,More,Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
//导入api集
import Api from '../../api'

import moment from "moment";

import { openLoading, closeLoading } from "../../utils/loading";

// =============定义存储储存的集合=============
var Data = reactive({
  // 输入的查询条件
  dsj_api_trackid_str: ref(""),
  dsj_api_business_str: ref(""),
  dsj_api_tableid_str: ref(""),
  dsj_api_action_str: ref(""),
  dsj_api_ts_str: ref(""),



  // 存储从后台获取的所有来源信息
  facultyOptions: reactive([
    {id:'',name:''},

  ]),
  // 存储选择后的值
  facultySelected: ref(""),

  //===========表格区域===============
  tapitrackid: reactive([]),

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
    trackid: Data.dsj_api_trackid_str ,//可以匹配多个字段
    business: Data.dsj_api_business_str,
    tableid: Data.dsj_api_tableid_str,
    action: Data.dsj_api_action_str,
    ts: Data.dsj_api_ts_str,
  }
  // axios请求
  Api.t_api_track_id.getAll(params)
      .then((res) =>{
        // 开启loading
        openLoading()
        // 判断是否成功
        if (res.status === 200){
          // 关闭loading
          closeLoading()
          Data.tapitrackid = res.data.results.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime()) //这是升序，倒序的话翻
          Data.total = res.data.count

        }
      })
}

// 时间戳转换成时间

// 显示全部数据
const listAllUser=()=>{
  //清除查询数据
  Data.dsj_api_trackid_str = "";
  Data.dsj_api_business_str = "";
  Data.dsj_api_tableid_str = "";
  Data.dsj_api_action_str = "";
  Data.dsj_api_ts_str = "";

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
    return moment(newdate).format("YYYY-MM-DD HH:mm:ss")//newdate*1000是秒 不*是毫秒
  }
}

</script>

<template>
  <!-- 查询区域 -->
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="Trackid:">
      <el-input v-model="Data.dsj_api_trackid_str" placeholder="请输入Trackid" />
    </el-form-item>
    <el-form-item label="Business:">
      <el-input v-model="Data.dsj_api_business_str" placeholder="请输入Business" />
    </el-form-item>
    <el-form-item label="Tableid:">
      <el-input v-model="Data.dsj_api_tableid_str" placeholder="请输入Tableid" />
    </el-form-item>
    <el-form-item label="Action:">
      <el-input v-model="Data.dsj_api_action_str" placeholder="请输入Action" />
    </el-form-item>
    <el-form-item label="Ts:">
      <el-input v-model="Data.dsj_api_ts_str" placeholder="请输入Ts" />
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
  <el-table :data="Data.tapitrackid" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="trackid" label="trackid"  align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="business" label="business"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="tableName" label="tableName"  align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="tableid" label="tableid"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="action" label="action"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext" label="ext"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ts" label="ts" :formatter="setDate" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column label="操作" align="center"  >
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
