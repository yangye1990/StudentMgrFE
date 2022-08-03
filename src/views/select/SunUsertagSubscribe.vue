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
  dy_uid_str: ref(""),
  dy_phone_str:ref(""),
  dy_source_str:ref(""),
  dy_track_id_str:ref(""),

  // 存储从后台获取的所有来源信息
  facultyOptions: reactive([
    {id:'',name:''},

  ]),
  // 存储选择后的值
  facultySelected: ref(""),

  //===========表格区域===============
  sunusertagsubscribe: reactive([]),

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
    uid: Data.dy_uid_str ,//可以匹配多个字段
    phone: Data.dy_phone_str,
    source: Data.dy_source_str,
    track_id: Data.dy_track_id_str,
  }
  // axios请求
  Api.sun_usertag_subscribe.getAll(params)
      .then((res) =>{
        // 判断是否成功
        console.log('成功',res)
        if (res.status === 200){
          Data.sunusertagsubscribe = res.data.results.sort((a, b) => new Date(b.utime).getTime() - new Date(a.utime).getTime()) //这是升序，倒序的话翻过来
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
  Data.dy_uid_str = "";
  Data.dy_phone_str = "";
  Data.dy_source_str = "";
  Data.dy_track_id_str = "";
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
  <el-form :inline="true" class="demo-form-inline" label-width="0px" style="display: flex"  >
    <el-form-item label="">
      <el-input v-model="Data.dy_uid_str" placeholder="请输入用户UID" />
    </el-form-item>
    <el-form-item label="">
      <el-input v-model="Data.dy_phone_str" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="" >
      <el-input v-model="Data.dy_source_str" placeholder="请输入来源" />
    </el-form-item>
    <el-form-item label="" >
      <el-input v-model="Data.dy_track_id_str" placeholder="请输入Track_Id" />
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
  <el-table :data="Data.sunusertagsubscribe" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="ids" label="id" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="uid" label="uid" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="phone" label="phone" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="source" label="source" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="subsource" label="subsource" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="track_id" label="track_id" align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="notice_type" label="notice_type" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="tagtype" label="tagtype"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="city_en" label="city_en" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="hid" label="hid"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="optrate" label="optrate"  align="center" width="80" :show-overflow-tooltip="true"/>
    <el-table-column prop="ctime" label="ctime" :formatter="setDate" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="utime" label="utime" :formatter="setDate" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="project_id" label="project_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="mid"  label="mid" align="center" width="300" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="project_type" label="project_type" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="colum_name" label="colum_name"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="datas" label="datas"  align="center" width="300" :show-overflow-tooltip="true"/>
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
