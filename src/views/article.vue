<template>
  <el-menu
    router
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="menu.close"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu class="logo">
      <i class="fab fa-codepen text-[30px]"></i>
      <span class="aaa text-md ml-2">hello</span>
    </el-menu>
    <el-sub-menu
      :index="menus.title"
      v-for="(menus, index) of menu.menus"
      :key="index"
    >
      <template #title>
        <i :class="menus.icon" class="text-2xl"></i>
        <span class="ml-2">{{ menus.title }}</span>
      </template>
      <el-menu-item
        :index="cmenu.route?.split('.').pop()"
        v-for="(cmenu, key) of menus?.children"
        :key="key"
        >{{ cmenu.title }}</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
  <div class="bg block md:hidden" @click="menu.toggleState()"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import menuStore from "@/stores/menuStore";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const menu = menuStore();
const refmenu = storeToRefs(menu);
const route = useRoute();
watch(route, () => menu.setCurrentMenu(route), { immediate: true });

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {};
const handleClose = (key: string, keyPath: string[]) => {};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

@media screen and(max-width:768px) {
  .el-menu-vertical-demo {
    @apply h-full z-50 absolute;
    .close {
    }
  }
  .bg {
    @apply bg-gray-100 z-40 opacity-75 w-screen h-screen absolute left-0 top-0;
  }
}
</style>
