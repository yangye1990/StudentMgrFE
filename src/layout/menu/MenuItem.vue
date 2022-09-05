<script lang="ts" setup>
// 导入基本模块
import { reactive } from "vue";
import Components from "../../components/Index.vue";

// 初始化数据
let menuList = reactive([
  {
    path: "/",
    meta: {
      title: "首页",
      icon: "HomeFilled",
    },
  },
  {
    path: "/select",
    meta: {
      title: "数据库查询",
      icon: "Search",
    },
    children: [
      {
        path: "/select/user",
        meta: {
          title: "查询用户中心表",
          icon: "Search",
        },
      },
      {
        path: "/select/ext_trace_source",
        meta: {
          title: "查询会员中心表",
          icon: "Search",
        },
      },
      {
        path: "/select/userfocus_uuid",
        meta: {
          title: "查询关注表",
          icon: "Search",
        },
      },
      {
        path: "/select/sun_usertag_subscribe",
        meta: {
          title: "查询订阅表",
          icon: "Search",
        },
      },
      {
        path: "/select/consult_yhuser",
        meta: {
          title: "查询优惠表",
          icon: "Search",
        },
      },
      {
        path: "/select/dongtai_user",
        meta: {
          title: "查询动态优惠表",
          icon: "Search",
        },
      },
      {
        path: "/select/yc_t_ticket_order",
        meta: {
          title: "查询车票订单ID",
          icon: "Search",
        },
      },
      {
        path: "/select/yc_t_ticket_order_lose",
        meta: {
          title: "查询车票表",
          icon: "Search",
        },
      },
      {
        path: "/select/etc_shop_goods_lz",
        meta: {
          title: "查询商品留资表",
          icon: "Search",
        },
      },
      {
        path: "/select/virtualnum",
        meta: {
          title: "查询虚拟号表",
          icon: "Search",
        },
      },
      {
        path: "/select/virtualnumcalldata",
        meta: {
          title: "查询虚拟电话记录",
          icon: "Search",
        },
      },
      {
        path: "/select/t_leju_sdkinfo",
        meta: {
          title: "查询大数据SDK表",
          icon: "Search",
        },
      },
      {
        path: "/select/t_api_track_id",
        meta: {
          title: "查询大数据API表",
          icon: "Search",
        },
      },
    ],
  },
  {
    path: "/contentspooling",
    meta: {
      title: "内容池查询",
      icon: "Search",
    },
    children: [
      {
        path: "/contentspooling/official",
        meta: {
          title: "正式线",
          icon: "ShoppingBag",
        },
      },
      {
        path: "/contentspooling/test",
        meta: {
          title: "测试线",
          icon: "Ship",
        },
      },
    ],
  },
  {
    path: "/live",
    meta: {
      title: "图文直播",
      icon: "PictureFilled",
    },
    children: [
      {
        path: "/live/add",
        meta: {
          title: "创建图文直播",
          icon: "VideoCameraFilled",
        },
      },
      {
        path: "/live/perform",
        meta: {
          title: "运行创建",
          icon: "OfficeBuilding",
        },
      },
    ],
  },
  {
    path: "/house/official",
    meta: {
      title: "楼盘库后台-正式线",
      icon: "House",
    },
    children: [
      {
        path: "/house/official/loupankuofficialxpath",
        meta: {
          title: "定位元素-正式线",
          icon: "Coordinate",
        },
      },
      {
        path: "/house/official/loupankuofficialdata",
        meta: {
          title: "创建楼盘-正式线",
          icon: "CreditCard",
        },
      },
    ],
  },
  {
    path: "/house/test",
    meta: {
      title: "楼盘库后台-测试线",
      icon: "House",
    },
    children: [
      {
        path: "/house/test/loupankuxpath",
        meta: {
          title: "定位元素-测试线",
          icon: "Coordinate",
        },
      },
      {
        path: "/house/test/loupankudata",
        meta: {
          title: "创建楼盘-测试线",
          icon: "CreditCard",
        },
      },
    ],
  },
  {
    path: "/heat",
    meta: {
      title: "楼盘热力值",
      icon: "Pointer",
    },
    children: [
      {
        path: "/heat/score_official",
        meta: {
          title: "查询正式线热力值",
          icon: "Coordinate",
        },
      },
      {
        path: "/heat/score_test",
        meta: {
          title: "查询测式线热力值",
          icon: "CreditCard",
        },
      },
    ],
  },
  {
    path: "/virtual",
    meta: {
      title: "通讯中台-虚拟号",
      icon: "PhoneFilled",
    },
    children: [
      {
        path: "/virtual/tm_axn",
        meta: {
          title: "天猫好房axn",
          icon: "Coordinate",
        },
      },
      {
        path: "/virtual/tm_axb",
        meta: {
          title: "天猫好房axb",
          icon: "CreditCard",
        },
      },
      {
        path: "/virtual/xf_axn",
        meta: {
          title: "新房axn",
          icon: "CreditCard",
        },
      },
      {
        path: "/virtual/laike_ali",
        meta: {
          title: "来客axb",
          icon: "CreditCard",
        },
      },
    ],
  },
  {
    path: "/user",
    meta: {
      title: "用户角色",
      icon: "Setting",
    },
    children: [
      {
        path: "/user/account",
        meta: {
          title: "登录账号",
          icon: "Coordinate",
        },
      },
      {
        path: "/user/roles",
        meta: {
          title: "角色信息",
          icon: "CreditCard",
        },
      },
      {
        path: "/user/menu",
        meta: {
          title: "菜单管理",
          icon: "DeleteLocation",
        },
      },
      {
        path: "/user/permission",
        meta: {
          title: "权限管理",
          icon: "Goods",
        },
      },
    ],
  },
]);
</script>
<template>
  <template v-for="menu in menuList">
    <!-- 如果有children并且children不为空，表示是二级菜单数据，先新建el-sub-menu -->
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title style="padding-left: 40px">
        <el-icon>
          <component class="icons" :is="menu.meta.icon"></component>
        </el-icon>
        <span >{{ menu.meta.title }}</span>
      </template>

      <!-- 展示二级菜单的第二层 -->
      <template v-for="child in menu.children">
        <el-menu-item :index="child.path">
          <el-icon>
            <component class="icons" :is="child.meta.icon"></component>
          </el-icon>
          <span>{{ child.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-sub-menu>
    <!-- 否则是一级菜单，直接新建el-sub-item -->
    <el-menu-item v-else :index="menu.path">
      <el-icon>
        <component class="icons" :is="menu.meta.icon"></component>
      </el-icon>
      <span>{{ menu.meta.title }}</span>
    </el-menu-item>
  </template>

</template>
<style scoped>
.el-menu-item {
  display: block;
  text-align: center;
  padding-right: 80px;
}
</style>

