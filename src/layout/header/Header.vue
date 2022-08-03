<script setup>
//导入Vue组件
import  CollapseVue from './Collaspe.vue'
import BredCumVue from './BredCum.vue'
import UserInfoVue from './UserInfo.vue'
import { ref } from 'vue'
let name = ref('刘洋')
</script>

<template>
  <div style="display: flex; align-items: center;">
    <CollapseVue></CollapseVue>
    <BredCumVue></BredCumVue>
  </div>
  <UserInfoVue :username="name"></UserInfoVue>
</template>

<style scoped>

</style>
