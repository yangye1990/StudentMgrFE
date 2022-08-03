<script lang="ts" setup>
//接收父组件的传值Header
defineProps<{username: string}>()


</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon style="margin-right: 10px;"><user-filled/></el-icon>
      <span>{{ username }}</span>
      <el-icon class="el-icon--right" style="margin-left: 10px;">
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>用户信息</el-dropdown-item>
        <el-dropdown-item>更改密码</el-dropdown-item>
        <el-dropdown-item>安全退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>
