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
  xnx_telA_str: ref(""),
  xnx_telB_str: ref(""),
  xnx_telX_str: ref(""),
  xnx_biz_str: ref(""),
  xnx_city_str: ref(""),


  // 存储从后台获取的所有来源信息
  facultyOptions: reactive([
    {id:'',name:''},

  ]),
  // 存储选择后的值
  facultySelected: ref(""),

  //===========表格区域===============
  virtualnum: reactive([]),

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
    telA: Data.xnx_telA_str ,//可以匹配多个字段
    telB: Data.xnx_telB_str ,//可以匹配多个字段
    telX: Data.xnx_telX_str ,//可以匹配多个字段
    biz: Data.xnx_biz_str ,//可以匹配多个字段
    city: Data.xnx_city_str ,//可以匹配多个字段

  }
  // axios请求
  Api.virtualnum.getAll(params)
      .then((res) =>{
        // 判断是否成功
        console.log('成功',res)
        if (res.status === 200){
          Data.virtualnum = res.data.results.sort((a, b) => new Date(b.create_date).getTime() - new Date(a.create_date).getTime()) //这是升序，倒序的话翻过来
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
  Data.xnx_telA_str = "";
  Data.xnx_telB_str = "";
  Data.xnx_telX_str = "";
  Data.xnx_biz_str = "";
  Data.xnx_city_str = "";

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
    return moment(newdate *1 ).format("YYYY-MM-DD HH:mm:ss") // 依情况进行更改 * 1 或 * 1000
  }
}

</script>

<template>
  <!-- 查询区域 -->
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="telX:">
      <el-input v-model="Data.xnx_telX_str" placeholder="请使用telX查询新数据" />
    </el-form-item>
    <el-form-item label="Biz:">
      <el-input v-model="Data.xnx_biz_str" placeholder="请输入来源Biz" />
    </el-form-item>
    <el-form-item label="telA:">
      <el-input v-model="Data.xnx_telA_str" placeholder="请输入telA" />
    </el-form-item>
    <el-form-item label="telB:">
      <el-input v-model="Data.xnx_telB_str" placeholder="请输入telB" />
    </el-form-item>
    <el-form-item label="City:">
      <el-input v-model="Data.xnx_city_str" placeholder="请输入城市city" />
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
  <el-table :data="Data.virtualnum" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="id"  label="id" align="center" width="80" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="telA"  label="telA" align="center" width="120" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="telX" label="telX" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="telB" label="telB" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="biz" label="biz" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="subid" label="subid"  align="center" width="300" :show-overflow-tooltip="true"/>
    <el-table-column prop="city" label="city" align="center" width="80" :show-overflow-tooltip="true"/>
    <el-table-column prop="platform" label="platform" align="center" width="100" :show-overflow-tooltip="true"/>
    <el-table-column prop="areacode" label="areacode" align="center" width="80" :show-overflow-tooltip="true"/>
    <el-table-column prop="create_time" label="create_time" :formatter="setDate" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="update_time" label="update_time" :formatter="setDate" align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="create_date" label="create_date" align="center" width="180" :show-overflow-tooltip="true"/>
    <el-table-column prop="expiration" label="expiration" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="exp_at" label="exp_at"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="hid" label="hid"  align="center" width="100" :show-overflow-tooltip="true"/>
    <el-table-column prop="source" label="source"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="ext" label="ext"  align="center" width="350" :show-overflow-tooltip="true"/>
    <el-table-column prop="telA_id" label="telA_id"  align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="requestId" label="requestId" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="pool_symbol" label="pool_symbol" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="house_id" label="house_id" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="symbol" label="symbol" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="service_id" label="service_id" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="provide_id" label="provide_id" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="parent_biz" label="parent_biz" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="pool_id" label="pool_id" align="center" width="150" :show-overflow-tooltip="true"/>
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
