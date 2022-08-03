<script lang="ts" setup>
// 导入vue
import { ref, computed } from "vue";
// 导入图标
import { Fold, Expand } from "@element-plus/icons-vue";
// 导入vue组件
import Components from "../../components/Index.vue";
// 导入useStore
import { useStore } from "vuex";
// 获取store对象
const store = useStore();

// 定义一个响应式的变量
const localCollapse = ref(false);
// 获取collapse值
const isCollapse = computed(() => {
  //赋值localCollapse
  localCollapse.value = store.getters["getCollapse"];
  return store.getters["getCollapse"];
});

// 定义函数实现修改
const changeCollapse=()=>{
  // 更改localCollapse的值--取反
  localCollapse.value = ! localCollapse.value;
  // 修改Store-->state中的collapse
  store.commit('setCollapse', localCollapse.value);
}
</script>

<template>
  <!-- 使用全局的图标 -->
  <el-icon>
    <component class="icons" :is="isCollapse ?  Expand:Fold" @click="changeCollapse"></component>
  </el-icon>
</template>

<style scoped>
.el-icon {
  font-size: 22px;
  margin-right: 10px;
}
</style>
