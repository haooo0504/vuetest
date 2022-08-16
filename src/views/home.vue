<template>
  <div class="w-screen h-screen relative flex items-center">
    <img
      src="/public/image/bg.jpg"
      class="absolute object-cover h-full w-full"
    />
    <div class="absolute md:left-20 md:w-[33%] w-[50%]">
      <div class="bgtitle flex justify-center">
        <p id="typed"></p>
      </div>
      <div class="flex mt-[100px] justify-center">
        <router-link :to="{ name: 'admin.home' }" class="button"
          >後臺管理</router-link
        >
        <router-link
          v-if="!utils.user.isLogin()"
          :to="{ name: 'login' }"
          class="button ml-7 !bg-[#ffa230] hover:!bg-[#fdbd6f]"
          >用戶登入</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import utils from "@/utils";
import Typed from "typed.js";

let typed = {} as Typed;
onMounted(() => {
  typed = new Typed("#typed", {
    strings: ["Welcome"],
    typeSpeed: 200,
    backSpeed: 100,
    loop: true,
  });
});
onUnmounted(() => {
  typed.destroy();
});
</script>

<style lang="scss" scoped>
.bgtitle {
  @apply text-gray-100 text-[100px];
}
.button {
  @apply w-auto px-5 py-2 mt-5 text-white text-xl font-extrabold bg-[#fd580c] rounded-lg hover:bg-[#ff7d41] duration-200;
}

@media screen and(max-width:768px) {
  div {
    @apply justify-center bg-slate-500;
    img {
      @apply hidden;
    }
    div {
      .bgtitle {
        @apply text-[80px];
      }
      div {
        @apply mt-5;
        .button {
          @apply text-base px-3 py-2;
        }
      }
    }
  }
}
</style>

<!-- <script lang="ts">
// export default {
//   route: { name: "home" },
// };
</script> -->
