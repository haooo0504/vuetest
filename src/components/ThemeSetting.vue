<template>
  <div>
    <section
      theme="outline"
      size="24"
      class="cursor-pointer text-ft-color flex items-center"
      @click="themeSettingDrawer = true"
    >
      <section
        :class="{ 'rotate-45': themeSettingDrawer }"
        class="duration-100"
      >
        <i class="fas fa-gear"></i>
      </section>

      <slot />
    </section>
    <el-drawer
      v-model="themeSettingDrawer"
      title="Theme Setting"
      :with-header="false"
      :size="300"
    >
      <div class="p-8 flex flex-col justify-center text-lg">
        <span class="mb-3 text-ft-color m-auto">主題設定</span>
        <div class="my-5">
          <span class="text-hd-black1 mx-3">主題顏色</span>
          <el-color-picker
            v-model="themeColor"
            :predefine="themeColorList"
            @active-change="changeThemeColor"
          />
        </div>
        <div class="my-5 hidden md:block">
          <span class="text-hd-black1 mx-3">麵包屑</span>
          <el-switch
            v-model="menuStore.isBreadcrumbCollapse"
            class="ml-2"
            inline-prompt
            active-color="#6BDBED"
            active-text="開"
            inactive-text="關"
            @change="menuStore.toggleBreadcrumb"
            size="large"
          />
        </div>
        <div class="my-5 hidden md:block">
          <span class="text-hd-black1 mx-3">歷史紀錄</span>
          <el-switch
            v-model="menuStore.isHistoryCollapse"
            class="ml-2"
            inline-prompt
            active-color="#6BDBED"
            active-text="開"
            inactive-text="關"
            @change="menuStore.toggleHistoryLink"
            size="large"
          />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import menuStores from "@/stores/menuStore";
import utils from "@/utils";
const menuStore = menuStores();
// 主題設定
const themeSettingDrawer = ref<boolean>(false);
const themeColor = ref<string>(utils.store.get("themeColor") || "#3f3f3f");
const themeColorList = ref<string[]>(["#fdcb6e", "#3DCAE0"]);
const el: HTMLElement = document.documentElement;
getComputedStyle(el).getPropertyValue(`--ft-color`);
el.style.setProperty("--ft-color", themeColor.value);
getComputedStyle(el).getPropertyValue(`--ft-hover-color`);
el.style.setProperty("--ft-hover-color", themeColor.value + "80");

const changeThemeColor = (color: string): void => {
  utils.store.set("themeColor", color);
  el.style.setProperty("--ft-color", color);
};
</script>
