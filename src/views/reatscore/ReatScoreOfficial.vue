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
  city_en_str: ref(""),
  hid_str: ref(""),
  salestate_str: ref(""),
  limit_str: ref(""),


  // 存储从后台获取的所有来源信息
  facultyOptions: reactive([
    {id:'',selects:'',selects_name:''} ]),
  // 存储选择后的值
  facultySelecteds: ref(""),

  //===========表格区域===============
  reatscore: reactive([]),

  //============分页================
  //当前页
  currentPage: ref(1),
  //每页大小
  pageSize: ref(1000),
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

const getSelect = () => {
  // axios请求
  Api.reat_select.getAll()
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.facultyOptions = res.data.results
        }
      }).catch((error) => {
    console.log('失败', error)
  })
}

const getUser = () => {
  //定义一个集合存储参数
  let params = {
    page: Data.currentPage,
    size: Data.pageSize,
    salestate: Data.salestate_str,//可以匹配多个字段
    hid: Data.hid_str,
    site: Data.city_en_str,
    limit: Data.limit_str,
    selects:Data.facultySelecteds,
  }
  // axios请求
  Api.reat_score.getAll(params)
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.reatscore = res.data.results
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


// 显示全部数据
const listAllUser = () => {
  //清除查询数据
  Data.salestate_str = "";
  Data.hid_str = "";
  Data.city_en_str = "";
  Data.limit_str = "";
  Data.facultySelecteds = "";
  // 重新请求
  getUser();
  getSelect();
}

//定义页面加载的时候自动执行的函数
const autoRun = () => {
  //获取user信息函数
  getUser();
  getSelect();
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

// 销售状态排序
const noticed_numSort = (obj1, obj2) => {
  let val1 = obj1.noticed_num
  let val2 = obj2.noticed_num
  return val1 - val2
}
// 总热力值排序
const house_hot_scoreSort = (obj1, obj2) => {
  let val1 = obj1.house_hot_score
  let val2 = obj2.house_hot_score
  return val1 - val2
}
// uv排序
const uv_numSort = (obj1, obj2) => {
  let val1 = obj1.uv_num
  let val2 = obj2.uv_num
  return val1 - val2
}
// 楼盘搜索量排序
const search_numSort = (obj1, obj2) => {
  let val1 = obj1.search_num
  let val2 = obj2.search_num
  return val1 - val2
}
// 评测排序
const reviewSort = (obj1, obj2) => {
  let val1 = obj1.review
  let val2 = obj2.review
  return val1 - val2
}
// VR排序
const vrSort = (obj1, obj2) => {
  let val1 = obj1.vr
  let val2 = obj2.vr
  return val1 - val2
}
// 车票排序
const tricketSort = (obj1, obj2) => {
  let val1 = obj1.tricket
  let val2 = obj2.tricket
  return val1 - val2
}
// 总热力值排序
const scoreSort = (obj1, obj2) => {
  let val1 = obj1.score
  let val2 = obj2.score
  return val1 - val2
}
</script>

<template>
  <!-- 查询区域 -->
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="城市:">
      <el-input v-model="Data.city_en_str" placeholder="请输入city_en"/>
    </el-form-item>
    <el-form-item label="数量:">
      <el-input v-model="Data.limit_str" placeholder="请输入查询数量"/>
    </el-form-item>

    <el-form-item label="选择:">
      <el-select v-model="Data.facultySelecteds" placeholder="请选择查询条件">
      <el-option
          v-for="item in Data.facultyOptions"
          :key="item.id"
          :label="item.selects_name"
          :value="item.selects">
      </el-option>
    </el-select>
    </el-form-item>

    <el-form-item label="楼盘hid:">
      <el-input v-model="Data.hid_str" placeholder="请输入楼盘hid"/>
    </el-form-item>
    <el-form-item label="销售状态:">
      <el-input v-model="Data.salestate_str" placeholder="请输入销售状态"/>
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
  <el-table :data="Data.reatscore" border stripe style="width: 100%"
            :header-cell-style="{backgroundColor:'#409Eff',color:'#FFF',fontSize:'14px'}"
  >
    <el-table-column type="index" label="序号" width="45"></el-table-column>
    <el-table-column prop="house_unique_id" label="楼盘唯一ID" align="center" width="120" :show-overflow-tooltip="true"/>
    <el-table-column prop="site" label="城市" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="hid" label="楼盘hid" align="center" width="80" :show-overflow-tooltip="true"/>
    <el-table-column prop="salestate" label="销售状态"  align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="salestate_name" label="销售状态"  align="center" width="200" :show-overflow-tooltip="true"/>
    <el-table-column prop="name" label="楼盘名称" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="noticed_num" label="楼盘关注量" :sortable="true" :sort-method="noticedSort" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="search_num" label="楼盘搜索量" :sortable="true" :sort-method="search_numSort" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="uv_num" label="楼盘uv量" :sortable="true" :sort-method="uv_numSort" align="center" width="150" :show-overflow-tooltip="true"/>
    <el-table-column prop="house_hot_score" label="总热力值" :sortable="true" :sort-method="house_hot_scoreSort"  align="center" width="150" :show-overflow-tooltip="true"/>
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
