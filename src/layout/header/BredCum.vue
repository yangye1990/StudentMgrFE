<script lang="ts" setup>
// 导入vue
import { Ref, ref, watch } from "vue";
// 定义useRoute模块
import { useRoute, RouteLocationMatched } from "vue-router";

// 定义一个面包屑的集合
const tabs: Ref<RouteLocationMatched[]> = ref([]);

// 获取当前路由的信息
const route = useRoute();

// 定义一个函数getBredCum
const getBredCum = () => {
  // 过滤路由匹配的信息 --route.matched  --meta, meta.title
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  // 获取matched中第一条
  const first = matched[0]
  // 判断是不是首页
  if(first.path !== '/dashboard'){
    matched = [{path: '/dashboard', meta: {'title': '首页'}} as any].concat(matched)
  }
  // 把拼接好的值给tabs
  tabs.value = matched;

};

// 自动调用getBredCum
getBredCum();

// 当请求的url的path变化，自动执行getBredCum
watch(() => route.path, ()=>getBredCum());

// 思路 --> 集合 tabs
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs">{{item.meta.title}}</el-breadcrumb-item>
    <!--
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>基础数据</el-breadcrumb-item>
    <el-breadcrumb-item>院系管理</el-breadcrumb-item>
    -->
  </el-breadcrumb>
</template>

<style scoped></style>
