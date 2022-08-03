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



  //============存储从后台获取的所有来源信息================
          // 存储从后台获取的项目信息
          tbprojectOptions: reactive([
            {projectID: '', projectType: ''},

          ]),
          // 存储从后台获取的页数信息
          pageOptions: reactive([
            {id: '', projectNumber: ''},

          ]),
          numberOptions: reactive([
            {id: '', projectNumber: ''},

          ]),
          houseOptions: reactive([
            {id: '', housename: ''},

          ]),
          eqnameOptions: reactive([
            {id: '', projectEqNAME: ''},

          ]),

          dynamicValidateForm: reactive({
            domains: [{
              colName: '',   // 栏目名称
              id: null,     // 站点id
              colId: null, // 栏目id
              children: [] // 站点下的栏目列表
            }],
          }),

          // 存储选择后的值
          tbprojectSelected: ref(""),
          pageSelected: ref(""),
          numberSelected:ref(""),
          houseSelected:ref(""),
          eqnameSelected:ref(""),
          SelectOptions:ref([{value:''}]),


          //===========表格区域===============
          users: reactive([]),

          //============分页================
          //当前页
          currentPage: ref(1),
          //每页大小
          pageSize: ref(28),
          //记录条数
          total: ref(0),
})

// 获取项目下拉框信息
const get_tb_project = () => {
  // axios请求
  Api.tb_project.getAll()
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.tbprojectOptions = res.data.results
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
// 获取项目页数
const get_page = () => {
  // axios请求
  Api.page.getAll()
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.pageOptions = res.data.results
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
//获取项目条数
const get_number = () => {
  // axios请求
  Api.number.getAll()
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.numberOptions = res.data.results
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
const get_house = () => {
  let params={
    tb_object:Data.tbprojectSelected
  }
  // axios请求
  Api.house.getAll(params)
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.model.region = res.data
          // 提示成功
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
const get_eqname = () => {
  // axios请求
  Api.eqname.getAll()
      .then((res) => {
        // 判断是否成功
        console.log('成功', res)
        if (res.status === 200) {
          Data.eqnameOptions = res.data.results
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

const addArea = () => {
  Data.model.region.push({ title: "" })
}
const delArea = (index) => {
  Data.model.region.splice(index, 1)
}




// 显示全部数据
const listAllUser = () => {
  //清除查询数据
  Data.phone_str = "";
  Data.source_str = "";
  // 重新请求
  get_tb_project();
}

//定义页面加载的时候自动执行的函数
const autoRun = () => {
  //获取user信息函数
  get_tb_project()
  get_page()
  get_number()
  get_house()
  get_eqname()
}
// 调用自动执行的函数
autoRun()


</script>


<template>
  <!-- 查询区域 -->
  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="项目名称:">
      <el-select v-model="Data.tbprojectSelected"  placeholder="请选择项目名称"  @change="get_house" style="width: 350px" clearable filterable>
        <el-option
            v-for="item in Data.tbprojectOptions"
            :key="item.projectID"
            :label="item.projectType"
            :value="item.projectID"/>
      </el-select>
    </el-form-item>
    <el-form-item label="查询页数:">
      <el-select v-model="Data.pageSelected" placeholder="请选择查询页数" @change="get_house">
        <el-option
            v-for="item in Data.pageOptions"
            :key="item.id"
            :label="item.projectNumber"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="查询条数:">
      <el-select v-model="Data.numberSelected" placeholder="请选择查询条数">
        <el-option
            v-for="item in Data.numberOptions"
            :key="item.id"
            :label="item.projectNumber"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>


  <el-collapse-item title="查询条件" name="1">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'条件' + index" :key="domain.key" :prop="'domains.' + index + '.value'">
        <el-select v-model="names[index]" placeholder="请选择">
          <el-option v-for="item in select_name1" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="ranges[index]" placeholder="请选择">
          <el-option v-for="item in range1" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input v-model="values[index]" placeholder="请输入内容" style="width: 30%;" clearable></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">新增条件</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-collapse-item>


  <!--  <el-form :inline="true" class="demo-form-inline" style="display: flex">-->
<!--    <div>-->
<!--      <el-form-item label="检索字段:" prop="houseSelected">-->
<!--        <el-select v-model="i.housename" placeholder="请选择检索字段" style="width: 350px">-->
<!--          <el-option-->
<!--              v-for="(item,index) in Data.houseOptions"-->
<!--              :key="item.index"-->
<!--              :label="item.housename"-->
<!--              :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="">-->
<!--        <el-select v-model="Data.eqnameSelected" placeholder="请选择" style="width: 150px" >-->
<!--          <el-option-->
<!--              v-for="item in Data.eqnameOptions"-->
<!--              :key="item.id"-->
<!--              :label="item.projectEqNAME"-->
<!--              :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="">-->
<!--        <el-input v-model="Data.phone_str" placeholder="请输入查询内容" style="width: 350px" />-->
<!--      </el-form-item>-->
<!--    </div>-->
<!--    <div style="text-align:left">-->
<!--      <el-button v-if="index == model.houseSelected.length - 1" @click="addArea">添加</el-button>-->
<!--      <el-button v-else type="danger" @click="delArea(index)">删除</el-button>-->
<!--    </div>-->
<!--  </el-form>-->



<!--  <el-form  v-for="(item,index) in Data.houseOptions" :key="index" :inline="true" class="demo-form-inline" style="display: flex">-->
<!--    <div>-->
<!--      <el-form-item label="检索字段:">-->
<!--        <el-select v-model="Data.fmtvideoSelected" placeholder="请选择检索字段" style="width: 350px">-->
<!--          <el-option-->
<!--              v-for="item in Data.fmtvideoOptions"-->
<!--              :key="item.id"-->
<!--              :label="item.housename"-->
<!--              :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="">-->
<!--        <el-select v-model="Data.eqnameSelected" placeholder="请选择" style="width: 150px" >-->
<!--          <el-option-->
<!--              v-for="item in Data.eqnameOptions"-->
<!--              :key="item.id"-->
<!--              :label="item.projectEqNAME"-->
<!--              :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="">-->
<!--        <el-input v-model="Data.phone_str" placeholder="请输入查询内容" style="width: 350px" />-->
<!--      </el-form-item>-->
<!--    </div>-->
<!--    <div style="text-align:left">-->
<!--      <el-button @click="addHierarchy">删除</el-button>-->
<!--    </div>-->
<!--  </el-form>-->


  <el-form :inline="true" class="demo-form-inline" style="display: flex">
    <el-form-item label="升降序">
      <el-input v-model="Data.phone_str" placeholder="例如：{updatetime}desc" style="width: 350px" />
    </el-form-item>
    <el-form-item label="查询想要的字段:">
      <el-input v-model="Data.phone_str" placeholder="例如：hid|site" style="width: 350px" />
    </el-form-item>
  </el-form>








  <el-form :inline="true" class="demo-form-inline" style="float: right">
    <el-form-item>
      <el-button type="primary" @click="getUser" >
        <el-icon>
          <component class="icons" is="Search" ></component>
        </el-icon>
        <span>查询</span>
      </el-button>
    </el-form-item>
  </el-form>
  <!-- 表格部分 -->
  <el-form :inline="true" class="demo-form-inline" style="display: contents">
  <div>
    <el-input
        type="textarea"
        :rows="8"
        placeholder="Please input"
        v-model="textarea" style="width:100%;float: left">
    </el-input>
  </div>
  <div>
    <el-input
        type="textarea"
        :rows="30"
        placeholder="Please input"
        v-model="textarea" style="width:100%;">
    </el-input>
  </div>
  </el-form>

</template>

<style scoped>

</style>
