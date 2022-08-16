<template>
  <div class="h-screen flex justify-center items-center p-5">
    <img
      src="/public/image/loginbg.jpg"
      class="absolute flex h-full w-full object-cover"
    />
    <router-view #default="{ Component }">
      <Transition
        mode="out-in"
        appear
        class="animate__animated"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
      >
        <component :is="Component" class="absolute w-full" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.animate__fadeIn {
  animation-duration: 0.3s;
}

.animate__fadeOut {
  animation-duration: 0.3s;
}
</style>
