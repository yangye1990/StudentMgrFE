<script lang="ts" setup>
// 引入Header和Menu的組件
import HeaderVue from "./header/Header.vue";
import MenuVue from "./menu/Menu.vue";

</script>

<template>
  <el-container class="layout">
    <el-aside class="aside" width="auto"><MenuVue></MenuVue></el-aside>
    <el-container>
      <el-header class="header"><HeaderVue></HeaderVue></el-header>
      <el-main class="main"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout {
  height: 100%;
}

.aside {
  background-color: #304156;
}
.header {
  /*background-color: lightseagreen;*/
  background-color: lightblue;
  height: 50px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
