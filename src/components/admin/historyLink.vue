<template>
  <div
    class="bg-gray-50 border-t border-b shadow-sm"
    v-show="menu.historyMenu.length"
  >
    <div class="mx-5 my-3 grid grid-flow-col gap-2 justify-start">
      <div
        href=""
        v-for="(item, index) of menu.historyMenu"
        :key="index"
        class="bg-white hover:bg-ft-color hover:text-white rounded-md py-2 px-3 text-sm border"
        :class="{ 'bg-ft-color text-white': route?.name == item.route }"
      >
        <router-link :to="{ name: item.route }">
          {{ item.title }}
        </router-link>
        <span @click="menu.removeHistoryMenu(item)">
          <i class="fas fa-xmark ml-2 hover:text-black cursor-pointer"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import menuStore from "@/stores/menuStore";
const menu = menuStore();
const route = useRoute();
console.log(route);
</script>

<style lang="scss" scoped></style>
